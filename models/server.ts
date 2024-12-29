import express, {Application} from "express";
import cors             from "cors";
import cookieParser     from "cookie-parser";
import dbConnection     from "../database/config";
import authRoutes       from "../routes/auth";
import locationRoutes   from "../routes/location";
import orderRoutes      from "../routes/order";
import truckRoutes      from "../routes/truck";
import userRoutes       from "../routes/usuario";

class Server {
    private app:    Application;
    private port:   string;
    private paths:  Record<string,string> = {
        auth:       '/api/auth',
        location:   '/api/location',
        order:      '/api/order',
        truck:      '/api/truck',
        usuario:    '/api/usuario',
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
        //cors
        this.app.use(cors());
        // Lectura y parseo del body
        this.app.use(express.json());
        // Configuración de cookie-parser
        this.app.use(cookieParser());
        //directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        //cors
        this.app.use(this.paths.auth,authRoutes);
        this.app.use(this.paths.location,locationRoutes);
        this.app.use(this.paths.order,orderRoutes);
        this.app.use(this.paths.truck,truckRoutes);
        this.app.use(this.paths.usuario,userRoutes);
    }
    
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en el puerto '+ this.port);
        })
    }
}

export default Server;