import { Router } from 'express';


import usersRouter from './users.js';
import instructorApplicationRouter from './instructorApplication.js';


const router = Router();

router.use('/users', usersRouter);
router.use('/instructor-applications', instructorApplicationRouter);

export default router;
