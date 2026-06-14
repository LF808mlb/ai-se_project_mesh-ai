import { Router } from 'express';
import multer from 'multer';
import { uploadDocument, listDocuments, getDocumentById, updateDocument, deleteDocument, ingestDocument } from '../controllers/documents.js';
import { auth } from '../middleware/auth.js';

const documentsRouter = Router();
const upload = multer({ dest: 'uploads/' });


documentsRouter.use(auth);

documentsRouter.get('/', listDocuments);
documentsRouter.get('/:id', getDocumentById);
documentsRouter.patch('/:id', updateDocument);
documentsRouter.delete('/:id', deleteDocument);
documentsRouter.post('/', upload.single('file'), uploadDocument);
documentsRouter.post('/:id/ingest', ingestDocument);


export { documentsRouter };