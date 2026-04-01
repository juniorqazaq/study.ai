import crypto from 'crypto';
import jwt, { type JwtPayload, type SignOptions } from 'jsonwebtoken';
import { env } from '../config/env.js';
import { prisma } from '../db/prisma.js';

export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export interface AccessPayload {
  userId: string;
  email: string;
}

const accessSignOptions: SignOptions = {
  expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
};

const refreshSignOptions: SignOptions = {
  expiresIn: env.JWT_REFRESH_EXPIRES_IN as SignOptions['expiresIn'],
};

export function generateAccessToken(user: { id: string; email: string }): string {
  return jwt.sign({ sub: user.id, email: user.email }, env.JWT_SECRET, accessSignOptions);
}

export function verifyAccessToken(token: string): AccessPayload {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload & { email?: string };
    const userId = decoded.sub;
    const email = decoded.email;
    if (typeof userId !== 'string' || typeof email !== 'string') {
      throw new jwt.JsonWebTokenError('Invalid access token payload');
    }
    return { userId, email };
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError || err instanceof jwt.TokenExpiredError) {
      throw err;
    }
    throw new jwt.JsonWebTokenError('Invalid access token');
  }
}

export async function generateRefreshToken(userId: string): Promise<string> {
  const refreshToken = jwt.sign({ sub: userId }, env.JWT_REFRESH_SECRET, refreshSignOptions);
  const decoded = jwt.decode(refreshToken) as JwtPayload;
  const expSec = decoded.exp;
  if (!expSec) {
    throw new Error('Refresh token missing exp claim');
  }
  const expiresAt = new Date(expSec * 1000);
  const tokenHash = hashToken(refreshToken);

  await prisma.refreshToken.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
    },
  });

  return refreshToken;
}

export async function verifyRefreshToken(refreshToken: string): Promise<{ userId: string }> {
  let payload: JwtPayload;
  try {
    payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as JwtPayload;
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError || err instanceof jwt.TokenExpiredError) {
      throw err;
    }
    throw new jwt.JsonWebTokenError('Invalid refresh token');
  }

  const userId = payload.sub;
  if (typeof userId !== 'string') {
    throw new jwt.JsonWebTokenError('Invalid refresh token payload');
  }

  const tokenHash = hashToken(refreshToken);
  const record = await prisma.refreshToken.findUnique({
    where: { tokenHash },
  });

  if (!record || record.userId !== userId) {
    throw new jwt.JsonWebTokenError('Refresh token revoked or invalid');
  }

  if (record.expiresAt.getTime() <= Date.now()) {
    await prisma.refreshToken.delete({ where: { id: record.id } }).catch(() => undefined);
    throw new jwt.TokenExpiredError('Refresh token expired', new Date());
  }

  return { userId };
}

export async function deleteRefreshTokenByValue(refreshToken: string): Promise<void> {
  const tokenHash = hashToken(refreshToken);
  await prisma.refreshToken.deleteMany({ where: { tokenHash } });
}
