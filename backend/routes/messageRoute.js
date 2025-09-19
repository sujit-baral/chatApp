import express from 'express';
import { getMessage, sendMessage } from '../controllers/messageController.js';
import isAuthenticated from '../middleware/isAuthenicated.js';

const router = express.Router();

router.route("/send/:id").post(isAuthenticated, sendMessage);
router.route("/:id").get(isAuthenticated, getMessage);

export default router;