import { connect } from "mongoose";

export default class Mongo {
  public status: boolean = false

  constructor() {
    this.newConnection()
  }

  async newConnection() {
    try {
      await connect(process.env.DB_MONGO_CONN || "");
      this.status = true;
      console.log("Database Mongo online");
    } catch (error: any) {
      this.status = false;
      console.error("Error connection to MongoDB")
    }
  }
}