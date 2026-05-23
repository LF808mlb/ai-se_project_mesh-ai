import type { Request, Response } from 'express';

export const uploadDocument = (req: Request, res: Response): void => {
	const { name, content } = req.body;
	if (!name || !content) {
		res.status(400).json({
			success: false,
			data: null,
			error: 'Missing required fields'
		});
		return;
	}
	// Simulate document upload
	res.status(201).json({
		success: true,
		data: {
			documentId: 'doc_' + Math.floor(Math.random() * 10000),
			name,
			uploadedAt: new Date().toISOString()
		},
		error: null
	});
};
