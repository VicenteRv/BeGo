import { Request, Response } from "express";




export const postLocation = async(req: Request, res: Response): Promise<void> =>{
    //enviar placeid para recibir los datos address, lat, long, place_id
    // const {place_id}: { place_id: string;}= req.body;
    // try {
    //     //verificar que exista para no duplicarla
    //     const existingLocation = await Location.findOne({ place_id });
    //     if (existingLocation) {
    //     return res.status(400).json({ msg: 'La ubicación ya existe.' });
    // }
    // } catch (error) {
        
    // }
}
export const getLocation = async(req: Request, res: Response): Promise<void> =>{
    res.json({
        msg: 'controlador Get'
    })
    
}
export const putLocation = async(req: Request, res: Response): Promise<void> =>{
    res.json({
        msg: 'controlador Put'
    })
    
}
export const deleteLocation = async(req: Request, res: Response): Promise<void> =>{
    res.json({
        msg: 'controlador Delete'
    })

}