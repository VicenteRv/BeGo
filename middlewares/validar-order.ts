import { Request, Response, NextFunction } from 'express';
import { orderDuplicada } from '../helpers/db-validators';
import { Types } from "mongoose";

export const validarLocationsOrder = async(req: Request, res:Response, next: NextFunction): Promise<any> =>{
    const { pickup, dropoff } = req.body;
    try {
        const duplicado = await orderDuplicada(pickup,dropoff);
        if(duplicado){
            return res.status(400).json({
                msg: 'Existe una order con las mismas locations verifique su order'
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'El id de pickup/dropoff no estan en la bd verifique que sean validos'
        })
    }
}