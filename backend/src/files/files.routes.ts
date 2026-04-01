import { Router } from 'express';
import { requireAuth } from '../auth/auth.middleware.js';
import { uploadSingle } from './upload.middleware.js';
import * as filesController from './files.controller.js';

const router = Router();
router.use(requireAuth);
router.post('/:bookId/upload', uploadSingle, filesController.uploadFile);

export default router;
