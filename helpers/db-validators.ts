import {Usuario} from "../models/usuario";
import {Truck} from "../models/truck";
import { Types } from 'mongoose';

export const existeUsuario = async(email: string):Promise<void>=>{
    const existeUsuario = await Usuario.findOne({email});
    if(existeUsuario){
        throw new Error(`El correo: ${email} ya fue registrado`);
    }
}
export const existePlaca = async(plate:string):Promise<void>=>{
    const existePlaca = await Truck.findOne({plate});
    if(existePlaca){
        throw new Error(`La placa ${plate} ya esta registrada`);
    }
}
export const existeTruckId = async(id:Types.ObjectId):Promise<void>=>{
    const existeUsuario = await Truck.findById(id);
    if(!existeUsuario){
        throw new Error(`No existe truck con id: ${id}`);
    }
}

export const idTruckActivo = async(id:Types.ObjectId):Promise<void>=>{
    const isIdTruck = await Truck.findById(id);
    if(!isIdTruck?.estado){
        throw new Error(`No existe truck con id ${id} - estado:false`);
    }
}