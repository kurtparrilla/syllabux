import { Router } from 'express'
import * as ApplicationController from '../controllers/instructorApplication.js'

const router = Router();

router.post('/', ApplicationController.apply);

export default router
