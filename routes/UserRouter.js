import express from 'express';
import { getUsersController } from '../controller/UserController.js';

import { userLogin } from '../middleware/Auth.js';

const router = express.Router();

router.get('/', userLogin, getUsersController);

export default router;