import { Router } from 'express';
import DynamoRouter from '../apps/dynamo/DynamoRouter';
import S3Router from '../apps/s3/S3Router';

const router = Router();

new S3Router(router)
new DynamoRouter(router)


export default router;