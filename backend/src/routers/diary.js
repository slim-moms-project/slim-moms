import { Router } from 'express';
import {
  addDiaryController,
  deleteDiaryController,
  getDiaryController,
} from '../controllers/diary.js';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { addDiarySchema } from '../validation/diary.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.use(authenticate);

//GET ctrlWrapper ile sarmalandı
router.get('/', ctrlWrapper(getDiaryController));

//POST önce validasyon sonra ctrlWrapper ile sarmalandı
router.post('/', validateBody(addDiarySchema), ctrlWrapper(addDiaryController));

//DELETE ctrlWrapper ile sarmalandı
router.delete('/:id', isValidId('id'), ctrlWrapper(deleteDiaryController));

export default router;
