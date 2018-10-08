import { Router } from 'express';
import validate from '../util/validations';
import Auth from '../util/authenticate';
import { diaryController } from '../controller';

const router = Router();

router.post('/entries', Auth.Verify, validate.entries, diaryController.addEntry);
router.get('/entries', Auth.Verify, diaryController.getEntries);
router.get('/entries/:entryId', Auth.Verify, diaryController.getEntry);
router.put('/entries/:entryId', Auth.Verify, validate.updateEntry, diaryController.modifyEntry);
router.put('/archive/entries', Auth.Verify, validate.arachive, diaryController.archiveEntry);

export default router;
