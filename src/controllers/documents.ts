import type { NextFunction, Request, Response } from 'express';
import Document from '../models/document.js';

export const ingestDocument = (req: Request, res: Response): void => {
	const { id } = req.params;
	// Dummy ingestion logic for demonstration
	if (id !== 'doc_1001' && id !== 'doc_1002') {
		res.status(404).json({
			success: false,
			data: null,
			error: 'Document not found'
		});
		return;
	}
	// Simulate async ingestion start
	res.status(202).json({
		success: true,
		data: { message: 'Ingestion started', documentId: id },
		error: null
	});
};

export const deleteDocument = (req: Request, res: Response): void => {
	const { id } = req.params;
	// Dummy delete logic for demonstration
	if (id !== 'doc_1001' && id !== 'doc_1002') {
		res.status(404).json({
			success: false,
			data: null,
			error: 'Document not found'
		});
		return;
	}
	res.status(204).send();
};

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

export const uploadDocument = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	if (!req.file) {
		res.status(400).send({
			success: false,
			data: null,
			error: { message: 'File is required' },
		});
		return;
	}

	const title = req.body.title || req.file.originalname;

	try {
		const document = await Document.create({
			title,
			fileName: req.file.originalname,
			userId: req.user!.userId,
		});

		res.status(201).send({
			success: true,
			data: document,
			error: null,
		});
	} catch (err) {
		next(err);
	}
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

export const listDocuments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const documents = await Document.find().where('userId').equals(req.user!.userId);

		res.status(200).json({
			success: true,
			data: documents,
			error: null
		});
	} catch (err) {
		next(err);
	}
};
