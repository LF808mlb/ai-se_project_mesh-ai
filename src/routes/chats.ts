import { Router } from 'express';
import { createChat, getChats, getChatById, updateChat, deleteChat, sendMessage } from '../controllers/chats.js';

const chatsRouter = Router();

chatsRouter.post('/', createChat);

chatsRouter.get('/', getChats);

chatsRouter.get('/:id', getChatById);

chatsRouter.patch('/:id', updateChat);

chatsRouter.delete('/:id', deleteChat);
chatsRouter.post('/:id/messages', sendMessage);

export { chatsRouter };