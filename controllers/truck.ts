import { Request, Response } from "express";
import { Truck } from "../models/truck";
import { Types } from "mongoose";


export const postCrearTruck = async(req: Request, res: Response):Promise<any> =>{
    const {year, color, plate}: { year: string; color: string; plate: string }= req.body;
    const usuario = req.usuario;
    if (!usuario || !usuario.id) {
        return res.status(400).json({
            msg: 'El jwt no esta valido',
        });
    }
    const truck = new Truck({
        user:usuario._id,
        year,
        color,
        plate})
    try {
        const truckdb = await truck.save();
        await truckdb.populate('user', 'email -_id');//para que no salga el id -_id
        res.status(201).json({
            msg: 'truck creado',
            datosTruk: truckdb
        })
    } catch (error) {
        console.log('Error al intentar crear el truck'+error);
        res.status(500).json({
            msg:'Hubo un problema intentelo de nuevo'
        })
    }
}
//solo regresa los activos
export const getObetenrTrucks = async(req: Request, res: Response):Promise<void> =>{
    const {limite = '10',desde = '0'}:{limite?:string, desde?:string} = req.query;
    try {
            const [total, usuarios] = await Promise.all([
                Truck.countDocuments({estado:true}),
                Truck.find({estado:true})
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('user','email -_id')
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
//regresa activos y desactivados para el usuario
export const getObetenerTruck = async(req: Request, res: Response):Promise<any> =>{
    const {limite = '10',desde = '0'}:{limite?:string, desde?:string} = req.query;
    const usuario = req.usuario;
    if (!usuario || !usuario.id) {
        return res.status(400).json({
            msg: 'El jwt no esta valido',
        });
    }
    try {
        const [total, usuarios] = await Promise.all([
            Truck.countDocuments({user:usuario.id}),
            Truck.find({user:usuario.id})
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('user','email -_id')
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
}                                           //Request    <Params, ResBody,   ReqBody>
//modifica trukc (plate,color)
export const putModificarTruck = async(req: Request<{ id: string }, any, { plate?: string, color?: string }>,res: Response):Promise<any> =>{
    const {id} = req.params;         
    const {plate,color} = req.body;
    const usuario = req.usuario;
    if (!usuario || !usuario.id) {
        return res.status(400).json({
            msg: 'El jwt no esta valido',
        });
    }
    try {
        const truck = await Truck.findOne({ _id: id, user: usuario.id });
        if (!truck) {
            return res.status(403).json({ msg: 'No tienes permiso para modificar este truck :(' });
        }
         await Truck.findByIdAndUpdate(id,{
            plate,
            color
        });
        return res.status(200).json({
            msg: 'Truck modificado exitosamente',
            dataMod:{
                plate,
                color
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg:'Error al actualizr los datos de truck'
        })
    }
}
//desactiva el truck por el id para no afectar otras colecciones con contienen el doc
export const deleteTruck = async(req: Request<{ id: string }, any, {confirmacion?:string}>,res: Response):Promise<any> =>{
    const {id} = req.params;
    const {confirmacion} = req.body;
    const usuario = req.usuario;
    if (!usuario || !usuario._id) {
        return res.status(400).json({
            msg: 'El jwt no esta valido',
        });
    }
    if(confirmacion === 'autorizado'){
        try {
            const truck = await Truck.findByIdAndUpdate(id,{estado:false},{new:true})
            .populate('user','email -_id');
            // .select('_id email');
            return res.status(200).json({
                msg: 'Truck desactivado',
                truck
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: 'Error al desactivar el truck',
                error
            })
        }
    }else{
        return res.status(400).json({
            msg: 'Debe de confirmar la accion'
        })
    }
}