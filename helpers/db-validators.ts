import {Usuario} from "../models/usuario";
import {Truck} from "../models/truck";
import { Types } from 'mongoose';
import { Location } from "../models/location";
import { Order } from "../models/order";

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

//verificar que exista para no duplicarla
export const existPlaceIdLocation = async(place_id:string):Promise<void>=>{
    const existPlaceId = await Location.findOne({ place_id });
    if (existPlaceId) {
       throw new Error(`La ubicacion con place_id ${place_id} ya existe`)
    }
} 

export const existeLocationId = async(id:Types.ObjectId):Promise<void> =>{
    const existLocationId = await Location.findById(id);
    if(!existLocationId){
        throw new Error(`El idLocation: ${id} no existe en la bd`)
    }
}

export const orderDuplicada = async (pickup: string, dropoff: string): Promise<boolean> => {
    const existOrder = await Order.findOne({ pickup, dropoff });
    if(existOrder){
        return true;
    }
    return false;
};

export const existeIdOrder = async (id:Types.ObjectId): Promise<void> => {
    const existIdOrder = await Order.findById(id);
    if(!existIdOrder){
        throw new Error(`No existe un order con id ${id} en la bd`)
    }
};