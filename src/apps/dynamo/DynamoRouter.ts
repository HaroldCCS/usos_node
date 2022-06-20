import { Router } from "express";
import DynamoController from "./DynamoController";

export default class DynamoRouter {
  public router: Router
  public dynamo: DynamoController

  constructor(router: Router) {
    this.router = router
    this.dynamo = new DynamoController()

    this.gets()
    this.posts()
    this.puts()
    this.deletes()
  }

  gets() {
    this.router.get('/dynamo/:_id', this.dynamo.get);
  }

  posts() {
    this.router.post('/dynamo', this.dynamo.create);

  }

  puts() {

  }

  deletes() {
    this.router.delete('/dynamo/:_id', this.dynamo.delete);

  }
}

