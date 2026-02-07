import { Request, Response, NextFunction } from 'express';
import { AppError, ValidationError } from '../utils/errors.js';
import { sendError } from '../utils/response.js';
import { logger } from '../utils/logger.js';
import { env } from '../config/env.js';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  // Log error
  logger.error('Error occurred:', {
    name: err.name,
    message: err.message,
    stack: env.NODE_ENV === 'development' ? err.stack : undefined,
  });

  // Handle known operational errors
  if (err instanceof AppError) {
    if (err instanceof ValidationError) {
      return sendError(res, err.message, err.code, err.statusCode, err.errors);
    }
    return sendError(res, err.message, err.code, err.statusCode);
  }

  // Handle Prisma errors
  if (err.name === 'PrismaClientKnownRequestError') {
    const prismaError = err as unknown as { code: string };
    if (prismaError.code === 'P2002') {
      return sendError(res, 'Resource already exists', 'CONFLICT', 409);
    }
    if (prismaError.code === 'P2025') {
      return sendError(res, 'Resource not found', 'NOT_FOUND', 404);
    }
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return sendError(res, 'Invalid token', 'INVALID_TOKEN', 401);
  }
  if (err.name === 'TokenExpiredError') {
    return sendError(res, 'Token expired', 'TOKEN_EXPIRED', 401);
  }

  // Handle unknown errors
  const message = env.NODE_ENV === 'production' 
    ? 'An unexpected error occurred' 
    : err.message;

  return sendError(res, message, 'INTERNAL_ERROR', 500);
}
