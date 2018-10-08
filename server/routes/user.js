import { Router } from 'express';
import validate from '../util/validations';
import { userController } from '../controller';

const router = Router();

router.post('/auth/signup', validate.signup, userController.signup);
router.post('/auth/login', validate.login, userController.login);

export default router;
