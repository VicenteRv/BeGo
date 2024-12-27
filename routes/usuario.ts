import { Router } from "express";
import { deleteUsuario, getUsuario, postUsuario, putUsuario } from "../controllers/usuario";

const router = Router();

router.post('/',    postUsuario);
router.get('/',     getUsuario);
router.put('/',     putUsuario);
router.delete('/',  deleteUsuario);


export default router;

