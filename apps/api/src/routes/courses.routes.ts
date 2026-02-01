import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import * as coursesController from '../controllers/courses.controller.js';

const router = Router();

// GET /api/courses - List enrolled courses
router.get('/', authenticate, coursesController.getEnrolledCourses);

// GET /api/courses/:id - Get course details
router.get('/:id', authenticate, coursesController.getCourseById);

export default router;
