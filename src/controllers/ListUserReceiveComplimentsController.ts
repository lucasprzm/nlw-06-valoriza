import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Compliment } from "../database/entities/Compliment";

export class ListUserReceiveComplimentsController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const complimentsRepository = AppDataSource.getRepository(Compliment);
    const compliments = await complimentsRepository.find({
      where: { user_receiver: user_id },
      relations: ["userSender", "userReceiver", "tag"],
    });
    return response.status(200).json(compliments);
  }
}
