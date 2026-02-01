import { Response } from 'express';

interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

interface PaginatedData<T> {
  items: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

interface ErrorResponse {
  success: false;
  error: {
    message: string;
    code: string;
    errors?: Record<string, string[]>;
  };
}

export function sendSuccess<T>(
  res: Response,
  data: T,
  message?: string,
  statusCode: number = 200
): Response {
  const response: SuccessResponse<T> = {
    success: true,
    data,
    ...(message && { message }),
  };
  return res.status(statusCode).json(response);
}

export function sendCreated<T>(res: Response, data: T, message?: string): Response {
  return sendSuccess(res, data, message, 201);
}

export function sendNoContent(res: Response): Response {
  return res.status(204).send();
}

export function sendPaginated<T>(
  res: Response,
  items: T[],
  page: number,
  pageSize: number,
  totalItems: number
): Response {
  const totalPages = Math.ceil(totalItems / pageSize);
  const data: PaginatedData<T> = {
    items,
    pagination: {
      page,
      pageSize,
      totalItems,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
  return sendSuccess(res, data);
}

export function sendError(
  res: Response,
  message: string,
  code: string,
  statusCode: number = 500,
  errors?: Record<string, string[]>
): Response {
  const response: ErrorResponse = {
    success: false,
    error: {
      message,
      code,
      ...(errors && { errors }),
    },
  };
  return res.status(statusCode).json(response);
}
