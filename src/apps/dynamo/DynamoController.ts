import { Request, Response } from 'express';
import DynamoService from "./DynamoService";


export default class DynamoController {
  //private dynamo: DynamoService

  constructor() {
    //this.dynamo = new DynamoService();
  }

  public async get(req: Request, res: Response) { DynamoService.get(req, res) }
  public async create(req: Request, res: Response) { DynamoService.create(req, res) }
  public async delete(req: Request, res: Response) { DynamoService.delete(req, res) };
}

