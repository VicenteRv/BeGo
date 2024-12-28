import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";
import { deleteLocation, getLocation, postLocation, putLocation } from "../controllers/location";

const router = Router();

router.post('/',[

],postLocation);
router.get('/',[

],getLocation);
router.put('/',[

],putLocation);
router.delete('/',[

],deleteLocation);


export default router;
