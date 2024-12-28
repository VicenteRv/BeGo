import { Request, Response } from "express";


export const postCrearTruck = (req: Request, res: Response) =>{
    res.json({
        msg: 'Post truck'
    })
}
export const getObetenrTrucks = (req: Request, res: Response) =>{

    res.json({
        msg: 'Get trucks'
    })
}
export const getObetenerTruck = (req: Request, res: Response) =>{
    const {id} = req.params;
    res.json({
        msg: 'Get truck',
        id
    })
}
export const putModificarTruck = (req: Request, res: Response) =>{
    res.json({
        msg: 'Put truck'
    })
}
export const deleteTruck = (req: Request, res: Response) =>{
    res.json({
        msg: 'Delete truck'
    })
}