import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";

import validarJWT from "../middlewares/validar-jwt";
import { deleteTruck, getObetenerTruck, getObetenrTrucks, postCrearTruck, putModificarTruck } from "../controllers/truck";

const router = Router();

// Ruta para registrar un nuevo usuario
router.post('/', [

], postCrearTruck);

//Ruta para mostrar todos los usuarios
router.get('/',getObetenrTrucks);

//Ruta para modicar datos del  usuario
router.get('/:id',[
],getObetenerTruck);

router.put('/',[

],putModificarTruck)


//Ruta para eliminar(desactivar)
router.delete('/',[
],deleteTruck);


export default router;