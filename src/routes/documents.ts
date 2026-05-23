import { Router } from 'express';
import { uploadDocument, listDocuments, getDocumentById } from '../controllers/documents.js';

const documentsRouter = Router();

documentsRouter.post('/', uploadDocument);
documentsRouter.get('/', listDocuments);
documentsRouter.get('/:id', getDocumentById);

export { documentsRouter };