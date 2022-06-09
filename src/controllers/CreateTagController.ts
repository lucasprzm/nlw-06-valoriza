import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../database";
import { Tag } from "../entities/Tag";

export class CreateTagController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const tagRepository = AppDataSource.getRepository(Tag);
    const { name } = request.body;
    if (!name) {
      throw new Error("You must fill de name field!");
    }
    const tagAlreadyExists = await tagRepository.findOneBy({ name: name });
    if (tagAlreadyExists) {
      throw new Error("Tag already exists!");
    }
    const tag = tagRepository.create({ name: name });
    await tagRepository.save(tag);
    return response.status(200).json(tag);
  }
}
