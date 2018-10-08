import { Router } from 'express';
import userRoute from './user';
import diaryRoute from './diary';

const router = Router();

router.use('/', userRoute);
router.use('/', diaryRoute);

export default router;
