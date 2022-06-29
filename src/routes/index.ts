import { Router } from 'express';
import DynamoRouter from '../apps/dynamo/DynamoRouter';
import S3Router from '../apps/s3/S3Router';

const router = Router();

let s3Router = new S3Router(router)
let dynamoRouter = new DynamoRouter(router)


export default router;