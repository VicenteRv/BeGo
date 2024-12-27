import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";
import { login } from "../controllers/auth";


const router = Router();

router.post('/login', [
    check('email', 'Ingrese un correo').not().isEmpty(),    
    check('email','No es un correo').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos // Middleware para validar los campos
], login);

export default router;