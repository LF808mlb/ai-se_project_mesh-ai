export const notFoundHandler = (req: Request, res: Response, _next: NextFunction): void => {
  res.status(404).json({
    success: false,
    data: null,
    error: 'nonexistent not found'
  });
};
import type { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction): void => {
  
  console.error(err);

  
  res.status(500).json({
    success: false,
    data: null,
    error: 'An error has occurred on the server'
  });
};
