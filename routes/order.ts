import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";
import { deleteOrder, getOrders, postOrder, putOrder } from "../controllers/order";


const router = Router();

router.post('/',[
],postOrder)
router.get('/',[
],getOrders)
router.put('/',[
],putOrder)
router.delete('/',[
],deleteOrder)

export default router;