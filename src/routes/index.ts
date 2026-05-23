import { Router } from 'express';
import { authRouter } from './auth.js';
import { chatsRouter } from './chats.js';

const router = Router();


router.use('/auth', authRouter);
router.use('/chats', chatsRouter);

export default router;
