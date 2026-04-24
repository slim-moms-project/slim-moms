import { Router } from 'express';
import authRouter from './auth.js';
import diaryRouter from './diary.js';
import productRouter from './product.js';

const router = Router();

// Ana Router'ları burada kullanacağız
router.use('/api/auth', authRouter);
router.use('/api/diary', diaryRouter);
router.use('/api/product', productRouter);

export default router;
