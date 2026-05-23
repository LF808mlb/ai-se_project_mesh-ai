export const listDocuments = (req: Request, res: Response): void => {
	// Dummy data for demonstration
	const userId = req.query.userId || 'user_001';
	const documents = [
		{
			documentId: 'doc_1001',
			userId,
			name: 'example.txt',
			uploadedAt: '2026-05-23T00:00:00Z'
		},
		{
			documentId: 'doc_1002',
			userId,
			name: 'notes.pdf',
			uploadedAt: '2026-05-22T00:00:00Z'
		}
	];
	res.status(200).json({
		success: true,
		data: documents,
		error: null
	});
};
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
