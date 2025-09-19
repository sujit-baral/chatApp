import { getOtherUsers, login, logout, register } from "../controllers/userController.js";
import express from "express";
import isAuthenticated from "../middleware/isAuthenicated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(isAuthenticated, getOtherUsers);

export default router;