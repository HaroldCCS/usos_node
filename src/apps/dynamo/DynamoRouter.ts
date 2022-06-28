import { Router } from "express";
import DynamoController from "./DynamoController";
import RouterBase from '../../routes/routerbase';


export default class DynamoRouter extends RouterBase {

  constructor(router: Router) {
    super(router, DynamoController)
  }

  gets() {
    this.router.get('/dynamo/:_id', this.entity.get);
  }

  posts() {
    this.router.post('/dynamo', this.entity.create);
  }

  deletes() {
    this.router.delete('/dynamo/:_id', this.entity.delete);
  }
}

