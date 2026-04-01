import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';
import { env } from '../config/env.js';

export interface GoogleProfile {
  providerId: string;
  email: string;
  fullName: string;
}

/**
 * The frontend sends the Google OAuth *access token* in the `id_token` field
 * (see @react-oauth/google). We resolve the user via userinfo; if that fails,
 * we fall back to verifying a real ID token (JWT) with google-auth-library.
 */
export async function resolveGoogleUser(idTokenField: string): Promise<GoogleProfile> {
  const userFromAccess = await tryUserInfoWithAccessToken(idTokenField);
  if (userFromAccess) {
    return userFromAccess;
  }

  if (!env.GOOGLE_CLIENT_ID) {
    throw new Error('Google OAuth is not configured (GOOGLE_CLIENT_ID)');
  }

  const client = new OAuth2Client(env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET);
  const ticket = await client.verifyIdToken({
    idToken: idTokenField,
    audience: env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  if (!payload?.sub) {
    throw new Error('Invalid Google ID token');
  }
  const email = payload.email;
  if (!email) {
    throw new Error('Google account has no email');
  }
  return {
    providerId: payload.sub,
    email: email.toLowerCase(),
    fullName: payload.name ?? email.split('@')[0] ?? 'User',
  };
}

async function tryUserInfoWithAccessToken(accessToken: string): Promise<GoogleProfile | null> {
  try {
    const { data } = await axios.get<{
      sub?: string;
      email?: string;
      name?: string;
    }>('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
      validateStatus: () => true,
    });
    if (data.sub && data.email) {
      return {
        providerId: data.sub,
        email: data.email.toLowerCase(),
        fullName: data.name ?? data.email.split('@')[0] ?? 'User',
      };
    }
  } catch {
    return null;
  }
  return null;
}
