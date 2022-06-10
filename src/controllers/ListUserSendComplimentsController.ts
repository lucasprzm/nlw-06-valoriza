import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Compliment } from "../database/entities/Compliment";

export class ListUserSendComplimentsController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const complimentsRepository = AppDataSource.getRepository(Compliment);
    const compliments = await complimentsRepository.findOneBy({ user_sender: user_id });
    return response.status(200).json(compliments);
  }
}
