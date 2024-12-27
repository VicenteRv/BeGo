import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/usuario';


declare global {
    namespace Express {
      interface Request {
        usuario?: any; // O puedes usar el tipo Usuario si tienes un tipo definido
      }
    }
}

const validarJWT = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion',
        });
    }
    try {
        // Verificar el token
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY||'')as{uid:string}
        
        // Buscar el usuario en la base de datos
        const usuario = await Usuario.findById(uid);
        
        // Si no existe el usuario
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en la base de datos',
            });
        }

        // Asignar usuario a la request
        req.usuario = usuario;

        next(); // Continuar con la siguiente función en el middleware
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido',
        });
    }
};

export default validarJWT;
