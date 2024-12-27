import { Request, Response } from "express";
import {Usuario} from "../models/usuario";
import bcryptjs from "bcryptjs";
import generarJWT from "../helpers/generar-jwt";


//controlador iniciar sesion
export const login = async(req: Request, res: Response): Promise<void|any> =>{
    const {email, password}: { email: string; password: string }= req.body;
    try {
        const usuario = await Usuario.findOne({email});
        //verficar si existe usuario
        if(!usuario){
            return res.status(400).json({
                msg: 'El email/correo son incorrectos - correo'
            });
        }
        //verificar si el usuario esta activo no desactivado
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'El email/correo son incorrectos - estado:false'
            });
        }
        //verificar la contraseña
        const validarPass:boolean = bcryptjs.compareSync(password,usuario.password);
        if(!validarPass){
            return res.status(400).json({
                msg: 'El email/correo son incorrectos - password'
            });
        }
        //generar el JWT
        const token = await generarJWT(usuario._id.toString());
        //generar la cookie
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: false,
            maxAge: 60 * 60 * 6 *1000,
        });
        res.status(200).json({
            msg: 'Login exitoso',
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Hable con el admin "
        });
    }
}