import { Router } from 'express';
import authRoutes from './auth.routes.js';
import dashboardRoutes from './dashboard.routes.js';
import coursesRoutes from './courses.routes.js';
import modulesRoutes from './modules.routes.js';
import lessonsRoutes from './lessons.routes.js';
import progressRoutes from './progress.routes.js';
import sessionsRoutes from './sessions.routes.js';

const router = Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/courses', coursesRoutes);
router.use('/modules', modulesRoutes);
router.use('/lessons', lessonsRoutes);
router.use('/progress', progressRoutes);
router.use('/sessions', sessionsRoutes);

export { router as routes };
