import Cookies from 'js-cookie';
import {
    GoogleLoginResponse,
    LoginCredentials,
    PhoneLoginResponse, SignUpCredentials,
    TokenResponse,
    GithubLoginResponse
} from '../../types/auth';
import { httpClient } from '../client';
import { clearAuthTokens, getRefreshToken } from '../../util/authHelpers';

export const login = async (
    credentials: LoginCredentials
): Promise<TokenResponse> => {
    return await httpClient.post<TokenResponse>('/auth/login', credentials);
};

export const signup = async (
    credentials: SignUpCredentials
): Promise<TokenResponse> => {
    return await httpClient.post<TokenResponse>('/auth/register', credentials);
};

export const googleLogin = async (
    idToken: string): Promise<GoogleLoginResponse> => {
    return await httpClient.post<GoogleLoginResponse>('/auth/google', { id_token: idToken });
}

export const githubLogin = async (
    code: string): Promise<GithubLoginResponse> => {
    return await httpClient.post<GithubLoginResponse>('/auth/github', { code });
};

export const logout = async (): Promise<void> => {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
        try {
            await httpClient.post<{ message: string }>('/auth/logout', { refreshToken });
        } catch {
            // Still clear local session if the server is unreachable
        }
    }
    clearAuthTokens();
};

export const getCurrentUser = () => {
    const userStr = Cookies.get('user');
    return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = (): boolean => {
    return !!Cookies.get('token');
};

export const getToken = (): string | null => {
    return Cookies.get('token') || null;
};



export const phoneLogin = async (idToken: string): Promise<PhoneLoginResponse> => await httpClient.post<PhoneLoginResponse>('/auth/phone-login', { idToken });