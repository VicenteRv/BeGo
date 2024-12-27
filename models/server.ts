import express, {Application} from "express";
import routerUsuario from "../routes/usuario";
import cors from "cors";

class Server {
    private app:    Application;
    private port:   string;
    private paths:  Record<string,string> = {
        usuario: '/api/usuario'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';

        //middlewares
        this.middlewares();

        //rutas del proyectio
        this.routes();

    }

    middlewares(){
        this.app.use(cors());
    }

    routes(){
        this.app.use(this.paths.usuario,routerUsuario);

    }
    
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en el puerto '+ this.port);
        })
    }
}

export default Server;