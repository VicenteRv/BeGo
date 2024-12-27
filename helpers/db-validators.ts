import {Usuario} from "../models/usuario";



export const existeUsuario = async(email: string)=>{
    const existeUsuario = await Usuario.findOne({email});
    if(existeUsuario){
        throw new Error(`El correo: ${email} ya fue registrado`);
    }
}