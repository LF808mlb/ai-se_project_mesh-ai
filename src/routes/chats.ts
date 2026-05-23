import { Router } from 'express';
import { createChat } from '../controllers/chats.js';

const chatsRouter = Router();

chatsRouter.post('/', createChat);

export { chatsRouter };