import { NextFunction, Request, Response } from "express";
import { User } from "../entities/User";
import { AppDataSource } from "../database/index";

export class CreateUserController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const userRepository = AppDataSource.getRepository(User);
    const { name, email, admin } = request.body;
    if (!email) {
      throw new Error("Incorrect email!");
    }
    const userAlreadyExists = await userRepository.findOneBy({ email: email });
    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }
    const user = userRepository.create({ name: name, email: email, admin: admin });
    await userRepository.save(user);
    return response.status(200).json(user);
  }
}
