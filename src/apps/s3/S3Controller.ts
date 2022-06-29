import { Request, Response } from 'express';
import S3Service from './S3Service';


export default class S3Controller {

  async get(req: Request, res: Response) { S3Service.get(req, res) }
  async create(req: Request, res: Response) { S3Service.create(req, res) }
  async delete(req: Request, res: Response) { S3Service.delete(req, res) }
}
