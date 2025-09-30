import { Request, Response } from "express";

export function roomController(req:Request,res:Response) {
    // db call

    res.json({
        roomId : 123
    })
}