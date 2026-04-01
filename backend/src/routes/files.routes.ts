import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import { uploadSingle } from '../middleware/upload.middleware.js';
import * as filesController from '../controllers/files.controller.js';

const router = Router();
router.use(requireAuth);
router.post('/:bookId/upload', uploadSingle, filesController.uploadFile);

export default router;
