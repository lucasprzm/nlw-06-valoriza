import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../database";
import { User } from "../database/entities/User";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const { user_id } = request;
  console.log(user_id);
  const usersRepository = AppDataSource.getRepository(User);
  const { admin } = await usersRepository.findOneBy({ id: user_id });
  if (admin) {
    return next();
  }
  return response.status(401).json({ error: "Unauthorized!" });
}
