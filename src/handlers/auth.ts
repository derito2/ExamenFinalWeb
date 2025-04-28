import AuthController from "../controllers/auth";
import HttpException from "../models/http-exception";
import type { Request, Response, NextFunction } from "express";

class AuthHandler {
  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        throw new HttpException(400, "El nombre de usuario y la contraseña son obligatorios");
      }

      const result = await this.authController.login(username, password);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

export default AuthHandler;
