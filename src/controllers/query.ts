import type { Request, Response } from 'express';

export const askQuestion = (req: Request, res: Response): void => {
	const { question } = req.body;
	if (!question) {
		res.status(400).json({
			success: false,
			data: null,
			error: 'Missing question field'
		});
		return;
	}
	// Dummy answer logic
	res.status(200).json({
		success: true,
		data: {
			question,
			answer: `Echo: ${question}`
		},
		error: null
	});
};
