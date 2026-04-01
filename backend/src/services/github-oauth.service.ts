import axios from 'axios';
import { env } from '../config/env.js';

export interface GithubProfile {
  providerId: string;
  email: string;
  fullName: string;
}

interface GitHubTokenResponse {
  access_token?: string;
  token_type?: string;
  scope?: string;
  error?: string;
  error_description?: string;
}

interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  email: string | null;
}

interface GitHubEmail {
  email: string;
  primary: boolean;
  verified: boolean;
}

export async function exchangeCodeAndFetchProfile(code: string): Promise<GithubProfile> {
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    throw new Error('GitHub OAuth is not configured');
  }

  const body = new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID,
    client_secret: env.GITHUB_CLIENT_SECRET,
    code,
    redirect_uri: env.GITHUB_REDIRECT_URI,
  });

  const tokenRes = await axios.post<GitHubTokenResponse>(
    'https://github.com/login/oauth/access_token',
    body.toString(),
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  const accessToken = tokenRes.data.access_token;
  if (!accessToken || tokenRes.data.error) {
    const msg = tokenRes.data.error_description ?? tokenRes.data.error ?? 'GitHub token exchange failed';
    throw new Error(msg);
  }

  const userRes = await axios.get<GitHubUser>('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  const ghUser = userRes.data;
  let email = ghUser.email?.toLowerCase() ?? null;

  if (!email) {
    const emailsRes = await axios.get<GitHubEmail[]>('https://api.github.com/user/emails', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    const primary = emailsRes.data.find((e) => e.primary && e.verified);
    const first = primary ?? emailsRes.data.find((e) => e.verified) ?? emailsRes.data[0];
    email = first?.email.toLowerCase() ?? null;
  }

  if (!email) {
    email = `${ghUser.id}+${ghUser.login}@users.noreply.github.com`;
  }

  return {
    providerId: String(ghUser.id),
    email,
    fullName: ghUser.name ?? ghUser.login,
  };
}
