import { Router } from 'express';
import { createChat, getChats } from '../controllers/chats.js';

const chatsRouter = Router();

chatsRouter.post('/', createChat);
chatsRouter.get('/', getChats);

export { chatsRouter };