import { Request, Response } from "express";


//controlador para crear usuario
export const postUsuario = (req: Request, res: Response) =>{
    const {body} = req;
    res.json({
        msg: 'postUsuario',
        body
    })
}
//controlador para buscar 1 usuario
export const getUsuario = (req: Request, res: Response) =>{
    res.json({
        msg: 'getUsuario'
    })
}
//controlador para modificar usuario
export const putUsuario = (req: Request, res: Response) =>{
    const id = req.body.id;
    res.json({
        msg: 'putUsuario'
    })
}
//controlador para eliminar usuario
export const deleteUsuario = (req: Request, res: Response) =>{
    res.json({
        msg: 'deleteUsuario'
    })
}