import { Router } from "express";
import S3Controller from "./S3Controller";

export default class S3Router {
  public router: Router
  public s3: S3Controller

  constructor(router: Router) {
    this.router = router
    this.s3 = new S3Controller()

    this.gets()
    this.posts()
    this.puts()
    this.deletes()
  }

  gets() {
    this.router.get('/s3/:_id', this.s3.get);
  }

  posts() {
    this.router.post('/s3', this.s3.create);

  }

  puts() {

  }

  deletes() {
    this.router.delete('/s3/:_id', this.s3.delete);

  }
}
