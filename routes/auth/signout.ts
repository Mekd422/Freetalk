import { Router, Request, Response, NextFunction } from "express";
import {User} from "../../src/models/user";
import { authenticationService } from "../../common";
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/signout', async (req: Request, res: Response, next: NextFunction) => {
    req.session = null;
    res.status(200).send({message: "successfully signed out"});
    
});

export { router as signoutRouter };