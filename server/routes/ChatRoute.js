
import express from 'express'
import { createChat, fetchChatMessages } from '../controllers/ChatController.js';
const router=express.Router();

router.get('/fetch/:chatId',fetchChatMessages);
router.post('/post',createChat);


export default router;


