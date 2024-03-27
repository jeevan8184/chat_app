

import express from 'express'
import { DeleteMultiple, createGroupMessage, createMessage, deleteMsg } from '../controllers/MessageController.js';
const router=express.Router();

router.post('/post',createMessage);
router.post('/group/post',createGroupMessage);
router.delete('/delete',DeleteMultiple);
router.delete('/delete/:id',deleteMsg);

export default router;
