
import express from 'express'

const router=express.Router();

import middleWare from '../middleware/index.js';

import { PostData, getUsers,getUser, getUserWithId, fetchUser } from '../controllers/onboarding.js';


router.post('/data',PostData);
router.get('/author',getUser);
router.get('/:id',getUserWithId);
router.get('/users/:id',getUsers);
router.get('/fetch/:userId',fetchUser);


export default router;
