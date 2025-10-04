import { CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import { Request, Response } from "express";

export async function  roomController(req:Request,res:Response) {
    try {
        const body = CreateRoomSchema.safeParse(req.body);

        if(!body.success){
            res.json({
                message : "Invalid Inputs"
            })
            return
        }

        const userId = req.userId;
        if(!userId){
            res.json({
                message: "Not authorized"
            })
            return
        }

        const room = await prismaClient.room.create({
            data: {
                slug: body.data.name,
                adminId: userId  
            }
        })

        res.json({
            roomId : room.id
        })
    } catch (error) {
         console.log(error);
        res.json({
            message: "Internal Error"
        })
        return
        
    }
}