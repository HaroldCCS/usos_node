import express, { Application } from "express";
import http from "http";
import { Server as ServerSocket } from 'socket.io'

//ROUTES
import generalRoute from "../routes";

//MIDDLEWARES
import ReadFile from "../middlewares/readFille";
import DefaultConfig from "../middlewares";
import Mongo from "../database/mongo";
import Aws from "../middlewares/aws";

//SOCKETS
import Sockets from "./sockets";


class Server {
	private app: Application;
	private app_socket: any;
	private io: ServerSocket;
	private port: string;
	private apiPaths = {
		general: "/api",
	};

	public mongo: Mongo | { status: boolean } = { status: false }

	constructor() {
		this.app = express();
		this.app_socket = http.createServer(this.app);
		this.io = require('socket.io')(this.app_socket, { cors: { origin: "*" } });

		this.middlewares();
		this.routes();
		this.sockets()
		this.connectionsDB()

		this.port = process.env.PORT || "8000";
	}

	connectionsDB() {
		this.mongo = new Mongo()
	}

	middlewares() {
		new DefaultConfig(this.app)
		new ReadFile(this.app)
		new Aws()
	}

	routes() {
		this.app.use(this.apiPaths.general, generalRoute);
	}

	sockets() {
		new Sockets(this.io)
	}

	listen() {
		this.app_socket.listen(this.port, () => {
			console.log("Servidor corriendo en puerto " + this.port);
		});
	}
}

export default new Server();
