
import express  from "express";

const router=express.Router();
import { AddMemberToGroup, RemoveMember, createGroup, exitGroup, fetchGroup, fetchGroupDetails, fetchGroupMessages, fetchGroups, removeGroup } from "../controllers/GroupController.js";

router.post('/post',createGroup);
router.get('/fetch/:chatId',fetchGroup);
router.get('/details/:chatId',fetchGroupDetails);
router.get('/fetch',fetchGroups);
router.get('/fetch/msgs/:chatId',fetchGroupMessages);
router.put('/post/addMember',AddMemberToGroup);
router.delete('/del/:chatId',removeGroup);
router.put('/exit',exitGroup);
router.put('/remove',RemoveMember);

export default router;

