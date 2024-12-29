import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";
import { deleteOrder, getOrders, pathOrderStatus, postOrder, putOrder } from "../controllers/order";
import { existeIdOrder, existeLocationId, existeTruckId } from "../helpers/db-validators";
import { validarPickupDropoff } from "../helpers/validar-order";
import { validarLocationsOrder } from "../middlewares/validar-order";


const router = Router();
//crear una orden
router.post('/',[
    validarJWT,
    check('truck','El camión es obligatorio').notEmpty(),
    check('truck','No es un ID válido de MongoDB').isMongoId(),
    check('truck').custom(existeTruckId),
    check('pickup','La ubicación de recogida es obligatoria').notEmpty(),
    check('pickup','No es un ID válido de MongoDB').isMongoId(),
    check('pickup').custom(existeLocationId),
    check('dropoff','La ubicación de entrega es obligatoria').notEmpty(),
    check('dropoff','No es un ID válido de MongoDB').isMongoId(),
    check('dropoff').custom(existeLocationId),
    check('pickup').custom(validarPickupDropoff),
    validarLocationsOrder,
    validarCampos
],postOrder)    
//obtener ordenes creadas por el usuario
router.get('/',[
    validarJWT,
    validarCampos
],getOrders)
//modificar order por id
router.put('/:id',[
    validarJWT,
    check('id','No es un id valido de mongo').isMongoId(),
    check('id','El id del order a modificar no existe').custom(existeIdOrder),
    check('pickup','La ubicación de recogida es obligatoria').notEmpty(),
    check('pickup','No es un ID válido de MongoDB').isMongoId(),
    check('pickup').custom(existeLocationId),
    check('dropoff','La ubicación de entrega es obligatoria').notEmpty(),
    check('dropoff','No es un ID válido de MongoDB').isMongoId(),
    check('dropoff').custom(existeLocationId),
    check('pickup').custom(validarPickupDropoff),
    validarLocationsOrder,
    validarCampos
],putOrder)
//modificar el status de order e
router.patch('/status/:id',[
    validarJWT,
    check('id','No es un id valido de mongo').isMongoId(),
    check('id').custom(existeIdOrder),
    check('status','Agregue el estado del status').notEmpty(),
    check('status').isIn(['created', 'in transit', 'completed'])
        .withMessage('Estatus no válido, verifique que es estatus cumpla con "created, in transit, completed"'),
    validarCampos
],pathOrderStatus)
//elimina un order por id
router.delete('/:id',[
    validarJWT,
    check('id','No es un id valido de mongo').isMongoId(),
    check('id').custom(existeIdOrder),
    check('confirmacion','Falta confirmacion').not().isEmpty()
        .isString().withMessage('El campo confirmacion debe ser una cadena'),
    check('confirmacion').equals('autorizado')
        .withMessage('Debe confirmar la acción con el valor autorizado"'),
    validarCampos
],deleteOrder)

export default router;