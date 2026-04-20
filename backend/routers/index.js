import { Router } from 'express';
import authRouter from './auth.js';
import diaryRouter from './diary.js';
import productRouter from './product.js';

const router = Router();

// Ana Router'ları burada kullanacağız
router.use('/auth', authRouter);
router.use('/diary', diaryRouter);
router.use('/product', productRouter);

export default router;
