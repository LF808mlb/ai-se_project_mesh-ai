import { Router } from 'express';
import { createChat, getChats, getChatById, updateChat } from '../controllers/chats.js';

const chatsRouter = Router();

chatsRouter.post('/', createChat);

chatsRouter.get('/', getChats);

chatsRouter.get('/:id', getChatById);
chatsRouter.patch('/:id', updateChat);

export { chatsRouter };