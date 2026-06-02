import { Router } from 'express';
import { uploadDocument, listDocuments, getDocumentById, updateDocument, deleteDocument, ingestDocument } from '../controllers/documents.js';
import { auth } from '../middleware/auth.js';

const documentsRouter = Router();

documentsRouter.use(auth);

documentsRouter.post('/', uploadDocument);
documentsRouter.get('/', listDocuments);
documentsRouter.get('/:id', getDocumentById);
documentsRouter.patch('/:id', updateDocument);
documentsRouter.delete('/:id', deleteDocument);
documentsRouter.post('/:id/ingest', ingestDocument);

export { documentsRouter };