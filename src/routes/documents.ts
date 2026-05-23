import { Router } from 'express';
import { uploadDocument, listDocuments, getDocumentById, updateDocument } from '../controllers/documents.js';

const documentsRouter = Router();

documentsRouter.post('/', uploadDocument);
documentsRouter.get('/', listDocuments);
documentsRouter.get('/:id', getDocumentById);
documentsRouter.patch('/:id', updateDocument);

export { documentsRouter };