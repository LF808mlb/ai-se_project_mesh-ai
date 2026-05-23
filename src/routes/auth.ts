import { Router } from 'express';
import { getCurrentUser, login } from '../controllers/auth.js';

const authRouter = Router();

authRouter.get('/me', getCurrentUser);
authRouter.post('/login', login);

export { authRouter };