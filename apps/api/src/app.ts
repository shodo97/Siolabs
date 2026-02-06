import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';

import { env, getCorsOrigins, isDevelopment } from './config/env.js';
import { errorHandler } from './middleware/error.middleware.js';
import { notFoundHandler } from './middleware/not-found.middleware.js';
import { routes } from './routes/index.js';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
const corsOrigins = getCorsOrigins();
app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Log CORS config in development
if (isDevelopment()) {
  console.log(`🌐 CORS enabled for: ${Array.isArray(corsOrigins) ? corsOrigins.join(', ') : corsOrigins}`);
}

// Request parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Compression
app.use(compression());

// Logging
if (env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API routes
app.use('/api', routes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
