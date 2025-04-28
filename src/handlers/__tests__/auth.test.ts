import AuthHandler from "../auth";
import AuthController from "../../controllers/auth";
import HttpException from "../../models/http-exception";
import { Request, Response } from "express";

jest.mock("../../controllers/auth");

describe("AuthHandler", () => {
  let authHandler: AuthHandler;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: jest.Mock;

  beforeEach(() => {
    authHandler = new AuthHandler();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    nextFunction = jest.fn();
  });

  describe("login", () => {
    it("should return 400 when username or password is missing", async () => {
      mockRequest = {
        body: {}
      };

      await authHandler.login(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).toHaveBeenCalledWith(expect.any(HttpException));
    });

    it("should return 200 and user data when login is successful", async () => {
      const mockResult = {
        fullName: "Ana Torres",
        favoriteBook: "Cien Años de Soledad"
      };
      
      (AuthController.prototype.login as jest.Mock).mockResolvedValue(mockResult);

      mockRequest = {
        body: { username: "ana.t", password: "libro123" }
      };

      await authHandler.login(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
    });

    it("should call next with error if controller throws", async () => {
      const mockError = new HttpException(401, "Usuario o contraseña incorrectos");
      (AuthController.prototype.login as jest.Mock).mockRejectedValue(mockError);

      mockRequest = {
        body: { username: "ana.t", password: "wrongpassword" }
      };

      await authHandler.login(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).toHaveBeenCalledWith(mockError);
    });
  });
});
