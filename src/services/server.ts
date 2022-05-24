import express, { Application } from "express";
import generalRoute from "../routes/generalRoute";
import cors from "cors";
import AWS from "aws-sdk"
const fileUpload = require('express-fileupload'); //requerido para leer imagenes
const morgan = require('morgan'); //requerido para leer imagenes

//import dbMONGO from "../db/mongo/connection";

class Server {
    private app: any;
    //private app: Application;
    private port: string;
    private apiPaths = {

        general: "/api",
    };

    constructor() {
        this.app = express();
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
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto " + this.port);
        });
    }
}

//export let statusDbMongo: boolean = false;
export default Server;
