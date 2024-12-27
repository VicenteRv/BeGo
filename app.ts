import dotenv from "dotenv";
import Server from "./models/server";
//configuracion del dot.env para var entorno
dotenv.config();

const server = new Server();

server.listen();


