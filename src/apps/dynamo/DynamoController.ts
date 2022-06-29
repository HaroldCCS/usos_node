import { Request, Response } from 'express';
import DynamoService from "./DynamoService";


export default class DynamoController {

  public async get({ req, res }: { req: Request; res: Response; }): Promise<void> { DynamoService.get(req, res) }
  public async create({ req, res }: { req: Request; res: Response; }): Promise<void> { DynamoService.create(req, res) }
  public async delete({ req, res }: { req: Request; res: Response; }): Promise<void> { DynamoService.delete(req, res) }
}

