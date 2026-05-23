import { Router } from 'express';
import { createChat, getChats, getChatById } from '../controllers/chats.js';

const chatsRouter = Router();

chatsRouter.post('/', createChat);

chatsRouter.get('/', getChats);
chatsRouter.get('/:id', getChatById);

export { chatsRouter };