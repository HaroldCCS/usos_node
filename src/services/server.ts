import express, { Application } from "express";
import generalRoute from "../routes/generalRoute";
import cors from "cors";
import AWS from "aws-sdk"
const fileUpload = require('express-fileupload'); //requerido para leer imagenes
const morgan = require('morgan'); //requerido para leer imagenes

import http from "http"; //* Requerido para socket io
import { Server as ServerSocket, Socket } from 'socket.io'

//import dbMONGO from "../db/mongo/connection";

class Server {
    private app: any;
    private app_socket: any;
    private io: ServerSocket;

    //private app: Application;
    private port: string;
    private apiPaths = {

        general: "/api",
    };

    constructor() {
        this.app = express();
        this.app_socket = http.createServer(this.app); //requerido para uso sockets
        this.io = require('socket.io')(this.app_socket, {cors: {origin: "*"}}); //requerido para uso sockets
        this.port = process.env.PORT || "8000";

        //this.dbConnectionMONGO();
        this.middlewares();
        this.routes();

        AWS.config.update({
            accessKeyId: process.env.AWSaccessKeyId,
            secretAccessKey: process.env.AWSsecretAccessKey,
            region: process.env.AWSregion,
        });
    }

    /*async dbConnectionMONGO() {
        try {
            await dbMONGO(process.env.DB_MONGO_CONN || "withoutURL")
            statusDbMongo = true;
            console.log("Database Mongo online");
        } catch (error: any) {
            console.error("Error connection to MongoDB")
            statusDbMongo = false;
        }
    }*/

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json())
        this.app.use(express.static("public"));
        this.app.use(fileUpload({ //requerido para leer imagenes
            createParentPath: true
        }));
        this.app.use(morgan('dev')); //requerido para leer imagenes
    }

    routes() {
        this.app.use(this.apiPaths.general, generalRoute);
    }

    listen() {
        this.io
        .of('/play')
        .on('connection', function (socket: any) {
            socket.channel = "";
    
            socket.on("joinChannel", function (data: any) {
                socket.channel = data.channel;
            });
    
            socket.on("message", function (data: any) {
                socket.broadcast.emit("message", {
                    channel: socket.channel,
                    message: data.message,
                    name: data.name,
                    type: data.type
                });
            });

            socket.on("draw", function (data: any) {
                socket.broadcast.emit("draw", {
                    channel: socket.channel,
                    message: data.message
                });
            });
        });

        this.app_socket.listen(this.port, () => {
            console.log("Servidor corriendo en puerto " + this.port);
        });
    }
}

//export let statusDbMongo: boolean = false;
export default Server;
