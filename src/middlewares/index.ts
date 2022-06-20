import express, { Application } from "express";
import dotenv from 'dotenv';
import cors from "cors";

export default class DefaultConfig {

  private app: Application

  constructor(app: Application) {
    this.app = app
    this.config()
    dotenv.config();
  }

  config() {
    this.app.use(cors());
    this.app.use(express.json())
    this.app.use(express.static("public"));
  }
}