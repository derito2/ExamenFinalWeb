import { Router } from "express";
import AuthHandler from "../handlers/auth";

const router = Router();
const authHandler = new AuthHandler();

router.post("/login", authHandler.login.bind(authHandler));

export default router;
