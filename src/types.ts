import { Request, Response } from 'express';
import { EntityManager } from '@mikro-orm/core';

export type MyContext = {
  em: EntityManager,
  req: Request,
  res: Response
}