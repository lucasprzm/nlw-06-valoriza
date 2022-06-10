import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;
  if (!authToken) {
    return response.status(401).end();
  }
  const [, token] = authToken.split(" ");
  try {
    const { sub } = verify(token, "314a9e485ee3170d49518b6713233b2a") as IPayLoad;
    request.user_id = sub;
    return next();
  } catch (error) {
    return response.status(401).end();
  }
}
