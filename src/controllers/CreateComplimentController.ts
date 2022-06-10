import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Compliment } from "../database/entities/Compliment";
import { User } from "../database/entities/User";

export class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const complimentRepository = AppDataSource.getRepository(Compliment);
    const userRepository = AppDataSource.getRepository(User);
    const { tag_id, user_sender, user_receiver, message } = request.body;

    if (user_sender === user_receiver) {
      throw new Error("You can't send a compliment to yourself!");
    }

    const userReceiverExists = await userRepository.findOneBy({ id: user_receiver });
    if (!userReceiverExists) {
      throw new Error("User Receiver does not exist!");
    }

    const compliment = complimentRepository.create({
      tag_id,
      user_receiver,
      user_sender,
      message,
    });
    await complimentRepository.save(compliment);

    return response.status(201).json(compliment);
  }
}
