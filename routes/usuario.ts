import { Router } from "express";
import { check } from "express-validator";
import { deleteUsuario, getUsuarios, postUsuario, putUsuario } from "../controllers/usuario";
import { validarCampos } from "../middlewares/validar-campos";
import { existeUsuario } from "../helpers/db-validators";
import validarJWT from "../middlewares/validar-jwt";

const router = Router();

// Ruta para registrar un nuevo usuario
router.post('/registrar', [
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('email', 'No es un correo').isEmail(),
    check('email').custom(existeUsuario),
    check('password', 'La contraseña debe de tener almenos 8 caracteres ').isLength({ min: 8 }),
    validarCampos // Middleware para validar los campos
], postUsuario);

//Ruta para mostrar todos los usuarios
router.get('/',     getUsuarios);

//Ruta para modicar datos del  usuario
router.put('/',[
    validarJWT,
    check('password','Debe de venir la contraseña').not().isEmpty(),
    validarCampos
],putUsuario);

//Ruta para eliminar(desactivar)
router.delete('/',[
    validarJWT,
    check('confirmacion','Falta confirmacion').not().isEmpty(),
    validarCampos
],deleteUsuario);


export default router;

