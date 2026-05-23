export const register = (req: Request, res: Response): void => {
  const { email, password, name } = req.body;
  // Dummy registration logic for demonstration
  if (!email || !password || !name) {
    res.status(400).json({
      success: false,
      data: null,
      error: 'Missing required fields'
    });
    return;
  }
  // Simulate user creation
  res.status(201).json({
    success: true,
    data: {
      userId: 'user_' + Math.floor(Math.random() * 10000),
      email,
      name,
      createdAt: new Date().toISOString()
    },
    error: null
  });
};
export const login = (req: Request, res: Response): void => {
  const { email, password } = req.body;
  // Dummy authentication logic for demonstration
  if (email === 'user@example.com' && password === 'password123') {
    res.status(200).json({
      success: true,
      data: {
        userId: 'user_001',
        email: 'user@example.com',
        name: 'John Doe',
        createdAt: '2026-01-01T00:00:00Z'
      },
      error: null
    });
  } else {
    res.status(401).json({
      success: false,
      data: null,
      error: 'Invalid email or password'
    });
  }
};
import type { Request, Response } from 'express';

export const getCurrentUser = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {
      userId: "user_001",
      email: "user@example.com",
      name: "John Doe",
      createdAt: "2026-01-01T00:00:00Z"
    },
    error: null
  });
};