import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";

import validarJWT from "../middlewares/validar-jwt";
import { deleteTruck, getObetenerTruck, getObetenrTrucks, postCrearTruck, putModificarTruck } from "../controllers/truck";
import { validarPlaca } from "../helpers/verificar-placa";
import { existePlaca, existeTruckId, idTruckActivo } from "../helpers/db-validators";

const router = Router();

// Ruta para registrar un nuevo truck
router.post('/', [
    validarJWT,
    check('year','Debe de ingresar el año').not().isEmpty(),
    check('year','verifique el año').isLength({min:4,max:4}).isString(),
    check('color','Debe de ingresar el color').not().isEmpty(),
    check('plate','Debe de ingresar las placas').not().isEmpty(),
    check('plate','Revise el tamaño de la placa').isLength({min:5,max:8}).isString(),
    check('plate').custom(existePlaca),
    check('plate').custom(validarPlaca),
    validarCampos
], postCrearTruck);

//Ruta para mostrar todos los trucks
router.get('/',[
    validarJWT,
    validarCampos
],getObetenrTrucks);
            
//Ruta consultar los trucks del usuario loggeado ruta protegida
router.get('/user',[
    validarJWT,
    validarCampos
],getObetenerTruck);
//modificar un truck por si id
router.put('/:id',[
    validarJWT,
    check('id','No es un id valido de mongo').isMongoId(),
    check('id','El id del truck no existe').custom(existeTruckId),
    check('color', 'El campo color debe ser una cadena de texto').optional()
        .isString().withMessage('El campo color debe ser una cadena')
        .notEmpty().withMessage('El campo color no puede estar vacío'),
    check('plate', 'El campo de la placa no contiene informacion').optional()
        .isString().withMessage('El campo plate debe ser una cadena')
        .notEmpty().withMessage('El campo plate no puede estar vacío')
        .custom(existePlaca),
    check('plate','No es una placa valida').optional().custom(validarPlaca),
    validarCampos
],putModificarTruck)


//Ruta para eliminar(desactivar)
router.delete('/:id',[
    validarJWT,
    check('id','No es un id valido de mongo').isMongoId(),
    check('id').custom(existeTruckId),
    check('id').custom(idTruckActivo),
    check('confirmacion','Falta confirmacion').not().isEmpty()
        .isString().withMessage('El campo confirmacion debe ser una cadena'),
    validarCampos
],deleteTruck);


export default router;