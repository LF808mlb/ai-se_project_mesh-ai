export const updateDocument = (req: Request, res: Response): void => {
	const { id } = req.params;
	const { name } = req.body;
	// Dummy update logic for demonstration
	if (id !== 'doc_1001' && id !== 'doc_1002') {
		res.status(404).json({
			success: false,
			data: null,
			error: 'Document not found'
		});
		return;
	}
	if (!name) {
		res.status(400).json({
			success: false,
			data: null,
			error: 'Missing name field'
		});
		return;
	}
	res.status(200).json({
		success: true,
		data: {
			documentId: id,
			name,
			updatedAt: new Date().toISOString()
		},
		error: null
	});
};
export const getDocumentById = (req: Request, res: Response): void => {
	const { id } = req.params;
	// Dummy data for demonstration
	if (id === 'doc_1001') {
		res.status(200).json({
			success: true,
			data: {
				documentId: 'doc_1001',
				userId: 'user_001',
				name: 'example.txt',
				uploadedAt: '2026-05-23T00:00:00Z'
			},
			error: null
		});
	} else if (id === 'doc_1002') {
		res.status(200).json({
			success: true,
			data: {
				documentId: 'doc_1002',
				userId: 'user_001',
				name: 'notes.pdf',
				uploadedAt: '2026-05-22T00:00:00Z'
			},
			error: null
		});
	} else {
		res.status(404).json({
			success: false,
			data: null,
			error: 'Document not found'
		});
	}
};
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
