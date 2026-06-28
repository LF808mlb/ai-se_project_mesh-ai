import type { Request, Response } from 'express';
import Chat from '../models/chat.js';
import Chunk from '../models/chunk.js';
import Document from '../models/document.js';
import Message from '../models/message.js';
import { createEmbedding } from '../utils/embeddings.js';
import { getClient, LLM_MODEL, buildContext, stripThinking } from '../utils/openai-client.js';
import { rankBySimilarity } from '../utils/vector-search.js';

export const createMessage = async (req: Request, res: Response): Promise<void> => {
  const { question } = req.body;
  const chatId = req.params.id;
  const userId = req.user!.userId;

  if (typeof question !== 'string' || question.trim().length === 0) {
    res.status(400).json({
      success: false,
      data: null,
      error: { message: 'question is required' },
    });
    return;
  }

  try {
    const chat = await Chat.findOne().where('_id').equals(chatId).where('userId').equals(userId);

    if (!chat) {
      res.status(404).json({
        success: false,
        data: null,
        error: { message: 'Chat not found' },
      });
      return;
    }

    const queryEmbedding = await createEmbedding(question);

    const userDocs = await Document.find().where('userId').equals(userId).select('_id');
    const docIds = userDocs.map((d) => d._id);

    const chunkRecords = await Chunk.find().where('documentId').in(docIds);
    const chunks = chunkRecords.map((c) => ({
      id: String(c._id),
      documentId: String(c.documentId),
      text: c.text,
      embedding: c.embedding,
    }));

    const ranked = rankBySimilarity(queryEmbedding, chunks, 5);
    const context = buildContext(ranked);

    const response = await getClient().chat.completions.create({
      model: LLM_MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant. Use only the provided context. If context is insufficient, say you do not have enough information.',
        },
        {
          role: 'user',
          content: `Question: ${question}\n\nContext:\n${context}`,
        },
      ],
    });

    const answer = stripThinking(response.choices[0]!.message.content ?? '') || 'No answer returned.';

    const [userMessage, assistantMessage] = await Promise.all([
      Message.create({
        chatId: chat._id,
        role: 'user',
        content: question.trim(),
      }),
      Message.create({
        chatId: chat._id,
        role: 'assistant',
        content: answer,
      }),
    ]);

    res.status(201).json({
      success: true,
      data: {
        messages: [userMessage, assistantMessage],
        sources: ranked.map((chunk) => ({
          chunkId: chunk.id,
          documentId: chunk.documentId,
          score: chunk.score,
        })),
      },
      error: null,
    });
  } catch {
    res.status(500).json({
      success: false,
      data: null,
      error: { message: 'Failed to create message' },
    });
  }
};