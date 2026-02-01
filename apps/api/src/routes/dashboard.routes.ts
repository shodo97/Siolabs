import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import * as dashboardController from '../controllers/dashboard.controller.js';

const router = Router();

// GET /api/dashboard
router.get('/', authenticate, dashboardController.getDashboard);

export default router;
