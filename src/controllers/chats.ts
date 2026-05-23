import type { Request, Response } from 'express';

export const createChat = (req: Request, res: Response): void => {
	const { userId, topic } = req.body;
	if (!userId || !topic) {
		res.status(400).json({
			success: false,
			data: null,
			error: 'Missing required fields'
		});
		return;
	}
	// Simulate chat session creation
	res.status(201).json({
		success: true,
		data: {
			chatId: 'chat_' + Math.floor(Math.random() * 10000),
			userId,
			topic,
			createdAt: new Date().toISOString()
		},
		error: null
	});
};
