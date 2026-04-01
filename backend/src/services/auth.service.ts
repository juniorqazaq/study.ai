import { AuthProvider } from '@prisma/client';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { prisma } from '../db/prisma.js';
import { AppError } from '../utils/app-error.js';
import type { GithubInput, GoogleInput, LoginInput, RegisterInput } from '../validation/auth.schemas.js';
import { exchangeCodeAndFetchProfile } from './github-oauth.service.js';
import { resolveGoogleUser } from './google-oauth.service.js';
import {
  deleteRefreshTokenByValue,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from './token.service.js';

function publicUser(user: { id: string; email: string; fullName: string }) {
  return { id: user.id, email: user.email, fullName: user.fullName };
}

export async function register(input: RegisterInput) {
  const passwordHash = await argon2.hash(input.password);
  const user = await prisma.user.create({
    data: {
      email: input.email.toLowerCase(),
      fullName: input.fullName,
      passwordHash,
    },
  });
  const accessToken = generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user.id);
  return {
    accessToken,
    refreshToken,
    message: 'Registration successful',
  };
}

export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({
    where: { email: input.email.toLowerCase() },
  });
  if (!user?.passwordHash) {
    throw new AppError(401, 'Invalid email or password');
  }
  const ok = await argon2.verify(user.passwordHash, input.password);
  if (!ok) {
    throw new AppError(401, 'Invalid email or password');
  }
  const accessToken = generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user.id);
  return {
    accessToken,
    refreshToken,
    message: 'Login successful',
  };
}

export async function googleAuth(input: GoogleInput) {
  let profile: Awaited<ReturnType<typeof resolveGoogleUser>>;
  try {
    profile = await resolveGoogleUser(input.id_token);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Google authentication failed';
    throw new AppError(401, msg);
  }

  const user = await upsertOAuthUser(AuthProvider.GOOGLE, profile);
  const accessToken = generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user.id);
  return {
    accessToken,
    refreshToken,
    user: publicUser(user),
  };
}

export async function githubAuth(input: GithubInput) {
  let profile: Awaited<ReturnType<typeof exchangeCodeAndFetchProfile>>;
  try {
    profile = await exchangeCodeAndFetchProfile(input.code);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'GitHub authentication failed';
    throw new AppError(401, msg);
  }

  const user = await upsertOAuthUser(AuthProvider.GITHUB, profile);
  const accessToken = generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user.id);
  return {
    accessToken,
    refreshToken,
    user: publicUser(user),
  };
}

async function upsertOAuthUser(
  provider: AuthProvider,
  profile: { providerId: string; email: string; fullName: string },
) {
  const email = profile.email.toLowerCase();

  const existingLink = await prisma.oAuthAccount.findUnique({
    where: {
      provider_providerId: {
        provider,
        providerId: profile.providerId,
      },
    },
    include: { user: true },
  });

  if (existingLink) {
    if (existingLink.user.email !== email || existingLink.user.fullName !== profile.fullName) {
      return prisma.user.update({
        where: { id: existingLink.userId },
        data: { email, fullName: profile.fullName },
      });
    }
    return existingLink.user;
  }

  const byEmail = await prisma.user.findUnique({ where: { email } });
  if (byEmail) {
    await prisma.oAuthAccount.create({
      data: {
        userId: byEmail.id,
        provider,
        providerId: profile.providerId,
      },
    });
    if (byEmail.fullName !== profile.fullName) {
      return prisma.user.update({
        where: { id: byEmail.id },
        data: { fullName: profile.fullName },
      });
    }
    return byEmail;
  }

  return prisma.user.create({
    data: {
      email,
      fullName: profile.fullName,
      passwordHash: null,
      accounts: {
        create: {
          provider,
          providerId: profile.providerId,
        },
      },
    },
  });
}

export async function refreshSession(refreshToken: string) {
  let userId: string;
  try {
    const v = await verifyRefreshToken(refreshToken);
    userId = v.userId;
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError || err instanceof jwt.TokenExpiredError) {
      throw new AppError(401, 'Invalid or expired refresh token');
    }
    throw err;
  }

  await deleteRefreshTokenByValue(refreshToken);

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new AppError(401, 'User no longer exists');
  }

  const accessToken = generateAccessToken(user);
  const newRefreshToken = await generateRefreshToken(user.id);

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
}

export async function logout(refreshToken: string) {
  try {
    await verifyRefreshToken(refreshToken);
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError || err instanceof jwt.TokenExpiredError) {
      throw new AppError(401, 'Invalid refresh token');
    }
    throw err;
  }
  await deleteRefreshTokenByValue(refreshToken);
  return { message: 'Logged out successfully' };
}
