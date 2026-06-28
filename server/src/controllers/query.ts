import type { Request, Response } from 'express';
import { getClient, LLM_MODEL, buildContext, stripThinking } from '../utils/openai-client.js';
import Chunk from '../models/chunk.js';
import Document from '../models/document.js';
import { createEmbedding } from '../utils/embeddings.js';
import { rankBySimilarity } from '../utils/vector-search.js';


export const askQuestion = async (req: Request, res: Response) => {
   const { question } = req.body;
 
   if (!question) {
     res.status(400).json({
       success: false,
       data: null,
       error: { message: 'question is required' },
     });
     return;
   }
 
   const userId = req.user?.userId;
   if (!userId) {
     res.status(401).json({
       success: false,
       data: null,
       error: { message: 'Unauthorized' },
     });
     return;
   }

   try {
     const questionEmbedding = await createEmbedding(question);

     const userDocs = await Document.find().where('userId').equals(userId).select('_id');
     const docIds = userDocs.map((d) => d._id);

     const chunkRecords = await Chunk.find().where('documentId').in(docIds);
     const chunks = chunkRecords.map((c) => ({
       id: String(c._id),
       documentId: String(c.documentId),
       text: c.text,
       embedding: c.embedding,
     }));

     const topChunks = rankBySimilarity(questionEmbedding, chunks, 5);
     const context = buildContext(topChunks);

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

     res.status(200).json({
       success: true,
       data: {
         question,
         answer,
         context,
         sources: topChunks.map((chunk) => ({
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
       error: { message: 'Failed to process question' },
     });
   }
 };

