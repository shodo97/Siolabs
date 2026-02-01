import { Request, Response } from 'express';
import { sendError } from '../utils/response.js';

export function notFoundHandler(_req: Request, res: Response): Response {
  return sendError(res, 'Route not found', 'NOT_FOUND', 404);
}
