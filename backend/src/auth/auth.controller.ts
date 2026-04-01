import type { RequestHandler } from 'express';
import * as authService from './auth.service.js';

export const register: RequestHandler = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const googleAuth: RequestHandler = async (req, res, next) => {
  try {
    const result = await authService.googleAuth(req.body);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const githubAuth: RequestHandler = async (req, res, next) => {
  try {
    const result = await authService.githubAuth(req.body);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const refresh: RequestHandler = async (req, res, next) => {
  try {
    const result = await authService.refreshSession(req.body.refreshToken);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  try {
    const result = await authService.logout(req.body.refreshToken);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};
