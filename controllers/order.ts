import { Request, Response } from "express";


export const postOrder = async(req: Request, res: Response): Promise<any> =>{
    res.json({
        msg:'controlador POST'
    })
}

export const getOrders = async(req: Request, res: Response): Promise<any> =>{
    res.json({
        msg:'controlador GET'
    })
    
}

export const putOrder = async(req: Request, res: Response): Promise<any> =>{
    res.json({
        msg:'controlador PUT'
    })
    
}

export const deleteOrder = async(req: Request, res: Response): Promise<any> =>{
    res.json({
        msg:'controlador DELETE'
    })

}