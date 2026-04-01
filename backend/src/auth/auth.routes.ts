import { Router } from 'express';
import * as authController from './auth.controller.js';
import { validate } from '../platform/validate.middleware.js';
import {
  githubSchema,
  googleSchema,
  loginSchema,
  logoutSchema,
  refreshSchema,
  registerSchema,
} from './auth.schemas.js';

const router = Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/google', validate(googleSchema), authController.googleAuth);
router.post('/github', validate(githubSchema), authController.githubAuth);
router.post('/refresh', validate(refreshSchema), authController.refresh);
router.post('/logout', validate(logoutSchema), authController.logout);

export default router;
