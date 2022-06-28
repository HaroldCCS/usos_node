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

  gets(): void { }

  posts(): void { }

  puts(): void { }

  deletes(): void { }
}
