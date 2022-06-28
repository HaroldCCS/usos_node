import { Router } from "express";
import S3Controller from "./S3Controller";
import RouterBase from '../../routes/routerbase';

export default class S3Router extends RouterBase {

  constructor(router: Router) {
    super(router, S3Controller)
  }

  gets() {
    this.router.get('/s3/:_id', this.entity.get);
  }

  posts() {
    this.router.post('/s3', this.entity.create);
  }

  deletes() {
    this.router.delete('/s3/:_id', this.entity.delete);
  }
}
