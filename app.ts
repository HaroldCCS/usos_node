import dotenv from 'dotenv';
import Server from './src/services/server';

// Configurar dot.env
dotenv.config();

const server = new Server();


server.listen();