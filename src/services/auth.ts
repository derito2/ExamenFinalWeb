import { Student } from "../models/student";
import HttpException from "../models/http-exception";

class AuthService {
  private students: Student[] = [
    {
      username: "ana.t",
      password: "libro123",
      fullName: "Ana Torres",
      favoriteBook: "Cien Años de Soledad"
    },
    {
      username: "marco.r",
      password: "lectura456",
      fullName: "Marco Ramírez",
      favoriteBook: "El Principito"
    },
    {
      username: "sofia.m",
      password: "novela789",
      fullName: "Sofía Morales",
      favoriteBook: "Orgullo y Prejuicio"
    }
  ];

  async login(username: string, password: string): Promise<{ fullName: string; favoriteBook: string }> {
    try {
      const student = this.students.find(
        (s) => s.username === username && s.password === password
      );

      if (!student) {
        throw new HttpException(401, "Usuario o contraseña incorrectos");
      }

      return {
        fullName: student.fullName,
        favoriteBook: student.favoriteBook
      };
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException(500, `Error en el inicio de sesión: ${err}`);
    }
  }
}

export default AuthService;
