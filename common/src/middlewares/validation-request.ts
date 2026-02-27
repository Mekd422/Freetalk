import {Request, Response, NextFunction} from 'express';
import { validationResult } from 'express-validator';
import { RequestValidatorError } from '../errors/request-validation-error';


export const validationRequest = async(req: Request, res: Response, next: NextFunction) =>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new RequestValidatorError(errors.array()))
    }

    next();
}