import { Request, Response } from "express";
import { obtenerDatosConPlaceID } from "../helpers/apiGoogle";
import { Location } from "../models/location";


export const postLocation = async(req: Request, res: Response): Promise<any> =>{
    // enviar placeid para recibir los datos address, lat, long, place_id
    const {place_id}: { place_id: string;}= req.body;

    try {
        // Obtener los detalles de la ubicación de Google Maps
        const datosLocation = await obtenerDatosConPlaceID(place_id);
        // Crear y guardar la nueva ubicación
        const location = new Location({
            address: datosLocation.address,
            place_id,
            latitude: datosLocation.latitude,
            longitude: datosLocation.longitude,
        });
        await location.save();
        res.status(201).json(location);

        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Revise el place_id' });
    }
}
export const getLocations = async(req: Request, res: Response): Promise<void> =>{
    const {limite = '10',desde = '0'}:{limite?:string, desde?:string} = req.query;
    try {
        const [total, locations] = await Promise.all([
            Location.countDocuments(),
            Location.find()
            .skip(Number(desde))
            .limit(Number(limite))
        ])
        res.status(200).json({
            total,
            locations
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg:'Ocurrion un error',
        });
    }
}
export const putLocation = async(req: Request<{ id: string }, any, { place_id: string;}>,res: Response): Promise<any> =>{
    const {id} = req.params;
    const {place_id}= req.body;

    try {
        //revisar si ya existe un idlocation con el mismo place_id pero con un idLocation diferente
        const locationExist = await Location.findOne({place_id,_id:{$ne:id}});
        if (locationExist) {
            return res.status(400).json({
                msg: `Ya existe un location con el place_id ${place_id}`,
            });
        }
        const datosLocation = await obtenerDatosConPlaceID(place_id);
        //actualizar la location con el place_id nuevo
        const locationActualizada = await Location.findByIdAndUpdate(id,{
                address: datosLocation.address,
                place_id,
                latitude: datosLocation.latitude,
                longitude: datosLocation.longitude,
            },{ new: true }
        );
        //checar que si se creo
        if (!locationActualizada) {
            return res.status(404).json({
                msg: `No se encontro la ubicación con id: ${id}`,
            });
        }
        return res.status(200).json({
            msg: 'Location modificado',
            location: locationActualizada,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg:'Error al actualizar los datos de location'
        })
    }
}
    export const deleteLocation = async(req: Request<{ id: string }, any, any>,res: Response): Promise<any> =>{
        const {id} = req.params;
        try {
            const locationDelete = await Location.findByIdAndDelete(id)
            return res.status(200).json({
                msg: 'Location elimidao de la bd',
                locationDelete
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: 'Error al eliminar el Location',
                error
            })
        }
    }