import { Router } from 'express';
import { authRouter } from './auth.js';
import { chatsRouter } from './chats.js';
import { documentsRouter } from './documents.js';

const router = Router();



router.use('/auth', authRouter);
router.use('/chats', chatsRouter);
router.use('/documents', documentsRouter);

export default router;
