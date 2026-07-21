import { Router } from 'express';
import { login, register } from '../controllers/auth.js';
import { loginLimiter, registerLimiter } from '../middleware/rate-limit.js';

const authRouter = Router();

authRouter.post('/login', loginLimiter, login);
authRouter.post('/register', registerLimiter, register);

export { authRouter };