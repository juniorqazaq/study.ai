import axios from 'axios';
import Cookies from 'js-cookie';
import { setAuthToken } from '@/shared/api/axiosInstance';
import { storageService } from '@/shared/services/storage.service';

const COOKIE_OPTS = { expires: 1 } as const;
const REFRESH_COOKIE_OPTS = { expires: 7 } as const;

export function parseAccessTokenUser(token: string): { id: string; email: string; fullName: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64)) as { sub?: string; email?: string };
    const id = typeof payload.sub === 'string' ? payload.sub : null;
    const email = typeof payload.email === 'string' ? payload.email : null;
    if (!id || !email) return null;
    return {
      id,
      email,
      fullName: email.split('@')[0] ?? 'User',
    };
  } catch {
    return null;
  }
}

export function saveAuthTokens(
  accessToken: string,
  refreshToken: string,
  user?: { id: string; email: string; fullName: string },
) {
  Cookies.set('token', accessToken, COOKIE_OPTS);
  Cookies.set('refreshToken', refreshToken, REFRESH_COOKIE_OPTS);
  setAuthToken(accessToken);
  if (user) {
    Cookies.set('user', JSON.stringify(user), COOKIE_OPTS);
    storageService.saveUser(user);
  }
}

export function clearAuthTokens() {
  Cookies.remove('token');
  Cookies.remove('user');
  Cookies.remove('refreshToken');
  setAuthToken(null);
  storageService.clearUser();
  window.dispatchEvent(
    new CustomEvent('authStatusChanged', {
      detail: { isAuthenticated: false },
    }),
  );
}

export function getRefreshToken(): string | null {
  return Cookies.get('refreshToken') ?? null;
}

export function getApiErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as { message?: string } | undefined;
    return data?.message ?? err.message ?? 'Something went wrong';
  }
  if (err instanceof Error) return err.message;
  return 'Something went wrong';
}
