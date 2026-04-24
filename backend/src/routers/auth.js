import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserController,
  loginUserController,
} from '../controllers/auth.js';
const router = Router();

// POST rotaları buraya uygulanacak

router.post('/register', ctrlWrapper(registerUserController));
router.post('/login', ctrlWrapper(loginUserController));

export default router;
