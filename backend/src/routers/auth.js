import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserController,
  loginUserController,
} from '../controllers/auth.js';
//import { authenticate } from '../middlewares/authenticate.js';
//import { validateBody } from '../middlewares/validateBody.js';
//import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

// POST rotaları buraya uygulanacak

router.post('/register', ctrlWrapper(registerUserController));
router.post('/login', ctrlWrapper(loginUserController));

export default router;
