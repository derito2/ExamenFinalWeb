import { Router } from "express";
import authRouter from "./auth";
import homeRouter from "./home";

const api = Router();

api.use("/auth", authRouter);
api.use("/", homeRouter);

export default Router().use("/", api);
