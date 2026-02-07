import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database.js';
import { env } from '../config/env.js';
import { sendSuccess, sendCreated } from '../utils/response.js';
import { BadRequestError, ConflictError } from '../utils/errors.js';
import type { LoginInput, RegisterInput } from '../validators/auth.validator.js';

export async function register(
  req: Request<unknown, unknown, RegisterInput>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictError('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        createdAt: true,
      },
    });

    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN } as jwt.SignOptions
    );

    sendCreated(res, { user, token }, 'Registration successful');
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: Request<unknown, unknown, LoginInput>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestError('Invalid email or password');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new BadRequestError('Invalid email or password');
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN } as jwt.SignOptions
    );

    sendSuccess(res, {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
}

export async function logout(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // In a more complex implementation, you might invalidate the token
    // by adding it to a blacklist in Redis
    sendSuccess(res, null, 'Logged out successfully');
  } catch (error) {
    next(error);
  }
}

export async function getMe(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    sendSuccess(res, { user });
  } catch (error) {
    next(error);
  }
}
