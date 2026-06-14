export const sendMessage = (req: Request, res: Response): void => {
	const { id } = req.params;
	const { message } = req.body;
	// Dummy chat existence check
	if (id !== 'chat_1001' && id !== 'chat_1002') {
		res.status(404).json({
			success: false,
			data: null,
			error: 'Chat not found'
		});
		return;
	}
	if (!message) {
		res.status(400).json({
			success: false,
			data: null,
			error: 'Missing message field'
		});
		return;
	}
	// Dummy reply logic
	res.status(201).json({
		success: true,
		data: {
			chatId: id,
			message,
			reply: `Echo: ${message}`,
			sentAt: new Date().toISOString()
		},
		error: null
	});
};
export const deleteChat = (req: Request, res: Response): void => {
	const { id } = req.params;
	// Dummy delete logic for demonstration
	if (id !== 'chat_1001' && id !== 'chat_1002') {
		res.status(404).json({
			success: false,
			data: null,
			error: 'Chat not found'
		});
		return;
	}
	res.status(204).send();
};
export const updateChat = (req: Request, res: Response): void => {
	const { id } = req.params;
	const { topic } = req.body;
	// Dummy update logic for demonstration
	if (id !== 'chat_1001' && id !== 'chat_1002') {
		res.status(404).json({
			success: false,
			data: null,
			error: 'Chat not found'
		});
		return;
	}
	if (!topic) {
		res.status(400).json({
			success: false,
			data: null,
			error: 'Missing topic field'
		});
		return;
	}
	res.status(200).json({
		success: true,
		data: {
			chatId: id,
			topic,
			updatedAt: new Date().toISOString()
		},
		error: null
	});
};
export const getChatById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const userId = req.user!.userId;

	try {
		const chat = await Chat.findOne()
			.where('_id')
			.equals(req.params.id)
			.where('userId')
			.equals(userId);

		if (!chat) {
			res.status(404).json({
				success: false,
				data: null,
				error: { message: 'Chat not found' }
			});
			return;
		}

		const messages = await Message.find()
			.where('chatId')
			.equals(chat._id)
			.sort({ createdAt: 1 });

		res.status(200).json({
			success: true,
			data: { chat, messages },
			error: null
		});
	} catch (err) {
		next(err);
	}
};

export const getChat = getChatById;

export const getChats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const chats = await Chat.find().where('userId').equals(req.user!.userId);

		res.status(200).json({
			success: true,
			data: chats,
			error: null
		});
	} catch (err) {
		next(err);
	}
};
import type { NextFunction, Request, Response } from 'express';
import Chat from '../models/chat.js';
import Message from '../models/message.js';

export const createChat = async (req: Request, res: Response, next: NextFunction) => {
	const { title } = req.body;

	if (!title) {
		res.status(400).json({
			success: false,
			data: null,
			error: { message: 'title is required' }
		});
		return;
	}

	try {
		const chat = await Chat.create({
			title,
			userId: req.user!.userId
		});

		res.status(201).json({
			success: true,
			data: {
				chatId: chat._id,
				title: chat.title,
				userId: chat.userId,
				createdAt: chat.createdAt
			},
			error: null
		});
	} catch (err) {
		next(err);
	}
};
