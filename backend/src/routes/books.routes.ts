import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import * as booksController from '../controllers/books.controller.js';
import * as lessonsController from '../controllers/lessons.controller.js';

const router = Router();
router.use(requireAuth);

router.get('/', booksController.getBooks);
router.post('/', booksController.createBook);
router.post('/:id/generate', lessonsController.generateLesson);
router.get('/:id/lesson', lessonsController.getLesson);
router.post('/:id/chat', lessonsController.chatWithBook);
router.get('/:id', booksController.getBook);
router.patch('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

export default router;
