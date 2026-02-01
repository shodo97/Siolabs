import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import * as modulesController from '../controllers/modules.controller.js';

const router = Router();

// GET /api/modules/:id - Get module details
router.get('/:id', authenticate, modulesController.getModuleById);

export default router;
