import { Router } from "express";


export default class RouterBase {
  public router: Router
  public entity: any

  constructor(router: Router, Entity: any) {
    this.router = router
    this.entity = new Entity()
    this.create()
  }

  create() {
    this.gets()
    this.posts()
    this.puts()
    this.deletes()
  }

  public gets(): void { }

  public posts(): void { }

  public puts(): void { }

  public deletes(): void { }
}
