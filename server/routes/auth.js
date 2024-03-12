
import express from 'express'

const router=express.Router();

import middleWare from '../middleware/index.js';
import { SignIn,SignUp,getData } from '../controllers/authForm.js';
router.post('/signin',SignIn);
router.post('/signup',SignUp);
router.get('/:id',getData);

export default router;