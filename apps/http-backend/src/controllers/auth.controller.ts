import { Request,Response } from "express";


export function signUp(req: Request,res: Response) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    
}