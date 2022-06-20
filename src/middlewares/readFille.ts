import { Application } from "express";
const fileUpload = require('express-fileupload'); //requerido para leer imagenes
const morgan = require('morgan'); //requerido para leer imagenes

export default class ReadFile {

  private app: Application

  constructor(app: Application) {
    this.app = app
    this.read()
  }


  read() {
    this.app.use(fileUpload({ createParentPath: true }));
    this.app.use(morgan('dev'));
  }

}