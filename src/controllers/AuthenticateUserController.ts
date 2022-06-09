import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { User } from "../entities/User";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";

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
    const token = sign({ email: user.email }, "314a9e485ee3170d49518b6713233b2a", {
      subject: user.id,
      expiresIn: "1d",
    });
    return response.status(200).json(token);
  }
}
