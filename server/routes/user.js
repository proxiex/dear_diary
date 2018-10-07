import { Router } from 'express';
import validate from '../util/validations';
import { userController } from '../controller';

const router = Router();

router.post('/signup', validate.signup, userController.signup);

export default router;
