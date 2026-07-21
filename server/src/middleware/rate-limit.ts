import rateLimit from 'express-rate-limit';

const isProduction = process.env.NODE_ENV === 'production';

const authRateLimitConfig = {
  skip: () => !isProduction,
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    data: null,
    error: { message: 'Too many requests, please try again later.' },
  },
};

export const loginLimiter = rateLimit(authRateLimitConfig);
export const registerLimiter = rateLimit(authRateLimitConfig);
