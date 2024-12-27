import { Request, Response } from "express";
import {Usuario} from "../models/usuario";
import bcryptjs from "bcryptjs";
import { body } from "express-validator";


//controlador para crear usuario
export const postUsuario = async(req: Request, res: Response): Promise<void> =>{
    const {email, password}: { email: string; password: string }= req.body;
    const usuario = new Usuario({email,password})
    //encryptar contraseña
    const salt:string = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);
    try {
        const user = await usuario.save();
        res.status(200).json({
            msg: 'Usuario registrado Exitosamente',
            data: {
                email: usuario.email,
                password: usuario.password,
                estado: usuario.estado,
            },
        })
    } catch (error: unknown) {
        console.log(error);
        res.status(400).json({
            msg: 'No se pudo registrar al usuario',
        })
    }
}
//controlador para mostrar usuarios
export const getUsuarios = async(req: Request, res: Response):Promise<void> =>{
    const {limite = '10',desde = '0'}:{limite?:string, desde?:string} = req.query;
    const query = {estado:true};
    try {
        const [total, usuarios] = await Promise.all([
            Usuario.countDocuments(query),
            Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
        ])
        res.status(200).json({
            total,
            usuarios
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg:'Ocurrion un error',
        });
    }
}
//controlador para modificar pass del  usuario
export const putUsuario = async (req: Request, res: Response): Promise<any> => {
    const { password}: { password?: string } = req.body;
    const usuario = req.usuario;
    if (!usuario || !usuario._id) {
        return res.status(400).json({
            msg: 'El jwt no esta valido',
        });
    }
    // Validar que no sea igual a la que ay se tiene en la bd
    const passok = bcryptjs.compareSync(password!, usuario.password);

    if (passok) {
        return res.status(400).json({
            msg: 'La nueva contraseña no puede ser la misma que la anterior intenlo de neuvo',
        });
    }
    let pass: string | undefined;
    try {
        if (password) {
            // Encriptar contraseña
            const salt = bcryptjs.genSaltSync();
            pass = bcryptjs.hashSync(password, salt);
            // Actualizar contraseña en la bd
            await Usuario.findByIdAndUpdate(usuario._id, { password: pass });

            res.status(200).json({
                msg: 'Contraseña actualizada',
                newPass:{
                    password,
                }
            });
        } else {
            res.status(400).json({
                msg: 'No se proporcionó una nueva contraseña',
            });
        }
    } catch (error) {
        console.log('Error al actualizar la contraseña', error);
        res.status(500).json({
            msg: 'Ocurrió un error al intentar actualizar la contraseña',
        });
    }
};

//controlador para eliminar usuario
export const deleteUsuario = async(req: Request, res: Response):Promise<any> =>{
    const {confirmacion}: {confirmacion?:string} = req.body;
    const usuario = req.usuario;
    if (!usuario || !usuario._id) {
        return res.status(400).json({
            msg: 'El jwt no esta valido',
        });
    }
    if(confirmacion === 'autorizado'){
        try {
            const user = await Usuario.findByIdAndUpdate(usuario._id,{estado:false})
            .select('_id email');;
            return res.status(200).json({
                msg: 'Usuario desactivado',
                user
            })
        } catch (error) {
            return res.status(500).json({
                msg: 'Error al desactivar el usuario',
                error
            })
        }
    }
    res.status(400).json({
        msg: 'Debe de confirmar la accion'
    })
}