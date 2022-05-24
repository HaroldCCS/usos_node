import { Router } from 'express';
import Dynamo from '../modules/dynamoModule';
import S3 from '../modules/s3Module'

const router = Router();



router.get('/dynamo/:_id',    Dynamo.get );
router.post('/dynamo',        Dynamo.create );
router.delete('/dynamo/:_id', Dynamo.delete );

router.get('/s3/:_id',    S3.get );
router.post('/s3',        S3.create );
router.delete('/s3/:_id', S3.delete );


export default router;