import { Router } from 'express';
import * as instructorsController from '../controllers/instructors.js';

const router = Router();

router.post('/',instructorsController.create);
router.get('/');
router.get('/:id');
router.patch('/:id');
router.delete('/:id',instructorsController.remove);

export default router;