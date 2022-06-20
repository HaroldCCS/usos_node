import { Server as ServerSocket } from 'socket.io';
import { msgFormat } from '../utils/formatObjectUtility';

export default class Sockets {
  private io: ServerSocket;

  constructor(io: ServerSocket) {
    this.io = io

    this.socketChat()
  }

  socketChat() {
    const nameSpaceChat = this.io.of('/chat');

    nameSpaceChat.on('connection', function (socket: any) {

      socket.channel = "";
      socket.username = ""

      socket.on("joinChannel", function (data: any) {
        socket.channel = data.channel;
        socket.join(data.channel)
      });


      socket.on("setName", function (name: string) {
        socket.username = name;
        socket.to(socket.channel).emit("message", msgFormat('se ha conectado', socket.username, 'connect'));
      });


      socket.on("disconnect", function (data: any) {
        socket.to(socket.channel).emit("message", msgFormat('se ha desconectado', socket.username, 'connect'));
      });


      socket.on("message", function (message: string) {
        socket.to(socket.channel).emit("message", msgFormat(message, socket.username, 'msg'));
      });


      socket.on("draw", function (data: any) {
        socket.to(socket.channel).emit("draw", data);
      });
    });
  }
}