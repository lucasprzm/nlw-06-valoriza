import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Tag } from "../database/entities/Tag";
import { instanceToPlain } from "class-transformer";

export class ListTagsController {
  async handle(request: Request, response: Response) {
    const tagsRepository = AppDataSource.getRepository(Tag);
    const tags = await tagsRepository.find();
    return response.status(200).json(instanceToPlain(tags));
  }
}
