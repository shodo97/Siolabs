import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { validateBody } from '../middleware/validation.middleware.js';
import * as lessonsController from '../controllers/lessons.controller.js';
import { videoProgressSchema } from '../validators/lesson.validator.js';

const router = Router();

// GET /api/lessons/:id - Get lesson details
router.get('/:id', authenticate, lessonsController.getLessonById);

// POST /api/lessons/:id/complete - Mark lesson as complete
router.post('/:id/complete', authenticate, lessonsController.completeLesson);

// PUT /api/lessons/:id/video-progress - Update video progress
router.put(
  '/:id/video-progress',
  authenticate,
  validateBody(videoProgressSchema),
  lessonsController.updateVideoProgress
);

export default router;
