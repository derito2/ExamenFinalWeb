import { Router } from "express";
import path from "path";
import type { Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

export default router;
