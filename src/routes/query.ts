import { Router } from 'express';
import { askQuestion } from '../controllers/query.ts';
import { auth } from '../middleware/auth.ts';


const queryRouter = Router();

queryRouter.use(auth);

queryRouter.post('/', askQuestion);

export { queryRouter };