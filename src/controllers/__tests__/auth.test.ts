import AuthController from "../auth";
import AuthService from "../../services/auth";
import HttpException from "../../models/http-exception";

jest.mock("../../services/auth");

describe("AuthController", () => {
  let authController: AuthController;
  let mockAuthService: jest.Mocked<AuthService>;

  beforeEach(() => {
    mockAuthService = new AuthService() as jest.Mocked<AuthService>;
    authController = new AuthController();
    (authController as any).authService = mockAuthService;
  });

  it("should return user data when login is successful", async () => {
    const mockResult = {
      fullName: "Ana Torres",
      favoriteBook: "Cien Años de Soledad"
    };
    
    mockAuthService.login.mockResolvedValue(mockResult);

    const result = await authController.login("ana.t", "libro123");

    expect(result).toEqual(mockResult);
    expect(mockAuthService.login).toHaveBeenCalledWith("ana.t", "libro123");
  });

  it("should throw error when login fails", async () => {
    const mockError = new HttpException(401, "Usuario o contraseña incorrectos");
    mockAuthService.login.mockRejectedValue(mockError);

    await expect(authController.login("ana.t", "wrongpassword"))
      .rejects
      .toThrow(HttpException);
  });
});
