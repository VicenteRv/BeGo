import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";
import { deleteLocation, getLocations, postLocation, putLocation } from "../controllers/location";
import { existeLocationId, existPlaceIdLocation } from "../helpers/db-validators";

const router = Router();
//crear locations
router.post('/',[
    validarJWT,
    check('place_id','Falta el valor del place_id').notEmpty(),
    check('place_id').custom(existPlaceIdLocation),
    validarCampos
],postLocation);
//mostrar todos los locations
router.get('/',[
    validarJWT,
    validarCampos
],getLocations);
//editar un location
router.put('/:id',[
    validarJWT,
    check('id','No es un id valido de mongo').isMongoId(),
    check('id','El id del location a modificar no existe').custom(existeLocationId),
    check('place_id','Falta el valor del place_id').notEmpty(),
    validarCampos,
],putLocation);
//elimiar location
router.delete('/:id',[
    validarJWT,
    check('id','No es un id valido de mongo').isMongoId(),
    check('id').custom(existeLocationId),
    check('confirmacion','Falta confirmacion').not().isEmpty()
        .isString().withMessage('El campo confirmacion debe ser una cadena'),
    check('confirmacion').equals('autorizado')
        .withMessage('Debe confirmar la acción con el valor autorizado"'),
    validarCampos
],deleteLocation);


export default router;
