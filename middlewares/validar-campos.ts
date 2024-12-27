import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

// Middleware para validar los campos en el cuerpo de la solicitud
export const validarCampos = (req: Request, res: Response, next: NextFunction): any=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};
