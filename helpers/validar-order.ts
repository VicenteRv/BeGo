import { Meta } from "express-validator";

export const validarPickupDropoff = (pickup:string,{req}:Meta) => {
    if (pickup === req.body.dropoff) {
        throw new Error('La ubicación de pickup y dropoff no pueden ser iguales');
    }
    return true;
};