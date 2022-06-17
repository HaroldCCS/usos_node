import { Server as ServerSocket } from 'socket.io';
import { msgFormat } from '../utils/formatObjectUtility';

export default class Sockets {
  private io: ServerSocket;

  constructor(io: ServerSocket) {
    this.io = io

    this.socketEvents()
  }

  socketEvents(){
    this.io
    .of('/play')
    .on('connection', function (socket: any) {
        
        socket.channel = "";
        socket.username = ""
        
        socket.on("disconnect", function (data: any) {
            socket.broadcast.emit("message", msgFormat(socket.channel, 'se ha desconectado', socket.username, 'connect'));
        });

        socket.on("joinChannel", function (data: any) {
            socket.channel = data.channel;
        });

        socket.on("message", function (data: any) {
            if (data.type === 'connect') socket.username = data.name;
            socket.broadcast.emit("message", msgFormat(socket.channel, data.message, data.name, data.type));
        });

        socket.on("draw", function (data: any) {
            socket.broadcast.emit("draw", {
                channel: socket.channel,
                message: data.message
            });
        });
    });
  }


}