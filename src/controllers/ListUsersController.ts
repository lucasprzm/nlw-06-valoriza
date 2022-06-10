import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { User } from "../database/entities/User";

export class ListUsersController {
  async handle(request: Request, response: Response) {
    const usersRepository = AppDataSource.getRepository(User);
    const users = await usersRepository.find();

    return response.status(200).json(instanceToPlain(users));
  }
}
