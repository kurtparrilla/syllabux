import { Router } from 'express';
import * as instructorsController from '../controllers/instructors.js';

const router = Router();

//initial routes, will be making changes

router.post('/',instructorsController.create);
router.get('/',instructorsController.getAll);
router.get('/:id',instructorsController.getById);
router.patch('/:id',instructorsController.update);
router.delete('/:id',instructorsController.remove);

export default router;