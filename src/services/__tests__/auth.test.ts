import AuthService from "../auth";
import HttpException from "../../models/http-exception";

describe("AuthService", () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  it("should return user data when login is successful", async () => {
    const result = await authService.login("ana.t", "libro123");
    
    expect(result).toEqual({
      fullName: "Ana Torres",
      favoriteBook: "Cien Años de Soledad"
    });
  });

  it("should throw HttpException when credentials are invalid", async () => {
    await expect(authService.login("ana.t", "wrongpassword"))
      .rejects
      .toThrow(HttpException);
  });

  it("should throw HttpException when user does not exist", async () => {
    await expect(authService.login("nonexistent", "password"))
      .rejects
      .toThrow(HttpException);
  });
});
