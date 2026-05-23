import { Router } from 'express';
import { uploadDocument } from '../controllers/documents.js';

const documentsRouter = Router();

documentsRouter.post('/', uploadDocument);

export { documentsRouter };