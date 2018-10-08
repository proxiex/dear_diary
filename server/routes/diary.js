import { Router } from 'express';
import validate from '../util/validations';
import Auth from '../util/authenticate';
import { diaryController } from '../controller';

const router = Router();

router.post('/entries', Auth.Verify, validate.entries, diaryController.addEntry);
router.get('/entries', Auth.Verify, diaryController.getEntries);

export default router;
