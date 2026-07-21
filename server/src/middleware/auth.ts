import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      data: null,
      error: { message: 'Authorization token required' },
    });
    return;
  }

  try {
    const token = authHeader.split(' ')[1];
    if (!token) {
      res.status(401).json({
        success: false,
        data: null,
        error: { message: 'Authorization token required' },
      });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({
        success: false,
        data: null,
        error: { message: 'Server configuration error' },
      });
      return;
    }

    const decoded = jwt.verify(token, jwtSecret) as unknown as {
      userId: string;
    };

    req.user = decoded;
    next();
  } catch {
    res.status(401).json({
      success: false,
      data: null,
      error: { message: 'Invalid or expired token' },
    });
  }
};