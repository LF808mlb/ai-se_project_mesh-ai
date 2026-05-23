import { Router } from 'express';
import { uploadDocument, listDocuments } from '../controllers/documents.js';

const documentsRouter = Router();

documentsRouter.post('/', uploadDocument);
documentsRouter.get('/', listDocuments);

export { documentsRouter };