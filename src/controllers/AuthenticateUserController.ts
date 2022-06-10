import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { User } from "../database/entities/User";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import "dotenv/config";

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const userRepository = AppDataSource.getRepository(User);
    const { email, password } = request.body;
    const user = await userRepository.findOneBy({ email });
    if (!user) {
      throw new Error("Email/Password Incorrect!");
    }
    const passwordMatch = compareSync(password, user.password);
    if (!passwordMatch) {
      throw new Error("Email/Password Incorrect!");
    }
    const token = sign({ email: user.email }, process.env.SECRET_KEY, {
      subject: user.id,
      expiresIn: "1d",
    });
    return response.status(200).json(token);
  }
}
