import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import * as sessionsController from '../controllers/sessions.controller.js';

const router = Router();

// GET /api/sessions - Get upcoming sessions
router.get('/', authenticate, sessionsController.getUpcomingSessions);

// GET /api/sessions/:id - Get session details
router.get('/:id', authenticate, sessionsController.getSessionById);

export default router;
