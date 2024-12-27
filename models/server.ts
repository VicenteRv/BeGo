import express, {Application} from "express";
import userRoutes from "../routes/usuario";
import cors from "cors";
import dbConnection from "../database/config";

class Server {
    private app:    Application;
    private port:   string;
    private paths:  Record<string,string> = {
        usuario: '/api/usuario'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';

        //conectar bd
        this.conectarDB();
        //middlewares
        this.middlewares();

        //rutas del proyectio
        this.routes();

    }

    async conectarDB(){
        await dbConnection();
    };

    middlewares(){
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes(){
        //cors
        this.app.use(this.paths.usuario,userRoutes);
        //lectura del body

        //publica
    }
    
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en el puerto '+ this.port);
        })
    }
}

export default Server;