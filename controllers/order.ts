import { Request, Response } from "express";
import { Order } from "../models/order";
import { Types } from "mongoose";


export const postOrder = async(req: Request, res: Response): Promise<any> =>{
    const {truck, pickup, dropoff}: { truck: string; pickup: string; dropoff: string }= req.body;
    const usuario = req.usuario;
    if (!usuario || !usuario.id) {
        return res.status(400).json({
            msg: 'El jwt no esta valido',
        });
    }
    const order = new Order({
        truck,
        pickup,
        dropoff,
        user: usuario.id,
        status: 'created'
    });
    try {
        await order.save();
        const orderdb = await Order.findById(order.id)
            .populate('user','email')
            .populate('truck','year color plate')
            .populate('pickup','address')
            .populate('dropoff','address')
        return res.status(201).json({
            msg:'Order creada existosamente',
            orderdb
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg:'Error al intentar crear la orden intentelo de nuevo'
        })
    }
}
export const getOrders = async(req: Request, res: Response): Promise<any> =>{
    const {limite = '10',desde = '0'}:{limite?:string, desde?:string} = req.query;
    try {
        const [total, orders] = await Promise.all([
            Order.countDocuments(),
            Order.find()
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('user','email')
            .populate('truck','year color plate')
            .populate('pickup','address')
            .populate('dropoff','address')
        ])
        res.status(200).json({
            total,
            orders
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg:'Ocurrion un error',
        });
    }
}

export const putOrder = async(req: Request<{ id: string }, any, { pickup?: string, dropoff?: string }>,res: Response): Promise<any> =>{
    const {id} = req.params;         
    const {pickup,dropoff} = req.body;
    const usuario = req.usuario;
    if (!usuario || !usuario.id) {
        return res.status(400).json({
            msg: 'El jwt no esta valido',
        });
    }
    try {
            const order = await Order.findOne({ _id: id, user: usuario.id });
            if (!order) {
                return res.status(403).json({ msg: 'No tienes permiso para modificar este Order' });
            }
            const updatedOrder = await Order.findByIdAndUpdate(id,{
                pickup,
                dropoff
            },{new:true})
            .populate('user','email')
            .populate('truck','year color plate')
            .populate('pickup','address')
            .populate('dropoff','address');
            return res.status(200).json({
                msg: 'Order modificado exitosamente',
                updatedOrder
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                msg:'Error al actualizar los datos de order'
            })
        }
}

export const pathOrderStatus = async (req: Request<{ id: string }, any, { status: string }>, res: Response): Promise<any> => {
    const {id} = req.params;
    const {status} = req.body;
    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({
                msg: `No se encontró una order con el id ${id}`,
            });
        }
        if (order.status === status) {
            return res.status(400).json({
                msg: 'El status del order es igual al que se quiere modificar ',
            });
        }
        const orderStatus = await Order.findByIdAndUpdate(id,
            {  status},{new:true})
            .populate('user','email')
            .populate('truck','year color plate')
            .populate('pickup','address')
            .populate('dropoff','address');
        return res.status(200).json({
            msg: 'Estatus de la orden actualizado correctamente',
            orderStatus
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Error al actualizar el estatus de la orden',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const deleteOrder = async(req: Request<{ id: string }, any, any>,res: Response): Promise<any> =>{
    const {id} = req.params;
    try {
        const orderDelete = await Order.findByIdAndDelete(id)
            .populate('user','email')
            .populate('truck','year color plate')
            .populate('pickup','address')
            .populate('dropoff','address');
        return res.status(200).json({
            msg: 'Order eliminado de la bd',
            orderDelete
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al eliminar el Order',
            error
        })
    }
}