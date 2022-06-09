import { NextFunction, Request, Response } from "express";
import { User } from "../database/entities/User";
import { AppDataSource } from "../database/index";
import { hash } from "bcryptjs";

export class CreateUserController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const userRepository = AppDataSource.getRepository(User);
    const { name, email, password, admin } = request.body;
    const passwordHash = await hash(password, 10);
    if (!email) {
      throw new Error("Incorrect email!");
    }
    const userAlreadyExists = await userRepository.findOneBy({ email });
    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }
    const user = userRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    });
    await userRepository.save(user);
    return response.status(200).json(user);
  }
}
