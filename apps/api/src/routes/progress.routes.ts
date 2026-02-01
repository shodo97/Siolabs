import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import * as progressController from '../controllers/progress.controller.js';

const router = Router();

// GET /api/progress - Get user's overall progress
router.get('/', authenticate, progressController.getUserProgress);

// GET /api/progress/courses/:courseId - Get course progress
router.get('/courses/:courseId', authenticate, progressController.getCourseProgress);

export default router;
