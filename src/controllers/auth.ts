import AuthService from "../services/auth";

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(username: string, password: string) {
    try {
      const result = await this.authService.login(username, password);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

export default AuthController;
