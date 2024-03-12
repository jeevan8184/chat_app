
import express from 'express'

const router=express.Router();

import middleWare from '../middleware/index.js';
import { PostData, getUsers,getUser } from '../controllers/onboarding.js';


router.post('/data',PostData);
router.get('/author',getUser);
router.get('/users/:id',getUsers);


export default router;
