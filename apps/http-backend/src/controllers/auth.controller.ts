import { Request,Response } from "express";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "@repo/backend-common/config"
import {prismaClient} from "@repo/db/client"
import {  SignUpSchema,SignInSchema} from "@repo/common/types"



export async function signUp(req: Request,res: Response) {
    try {        
        const body = SignUpSchema.safeParse(req.body)
        if(!body.success){
            res.json({
                message: "Invalid Inputs"
            });
            return;
        }

        const isUser = await prismaClient.user.findFirst({
            where: {
                email: body.data.email,
            }
        })

        if(isUser){
            res.json({
                message: "User already exist with this email"
            })
            return;
        }else{
            const user = await prismaClient.user.create({
                data: {
                    email: body.data.email,
                    password: body.data.password,
                    name: body.data.name
                }
            })

            res.status(200).json({
                message: "User Signed Up Successfully"
            })
            return;
        }

        

    } catch (error) {
        console.log(error);
        res.json({
            message: "Internal Error"
        })
        return
        
    }



    
}
export async function signIn(req: Request,res: Response){
    try {
        const body = SignInSchema.safeParse(req.body);
     if(!body.success){
        res.json({
            message: "Invalid Inputs"
        });
        return;
    }

    const isUser = await prismaClient.user.findFirst({
        where: {
            email: body.data.email
        }
    })

    if(!isUser){
        res.json({
            message: "User does not exist with this email and password"
        })
        return;
    }else{
        const userId = isUser.id;
        const token = jwt.sign({userId}, JWT_SECRET)

        res.json({
            message : "User Signed In Successfully",
            token: token
        })
        return;
    }

    } catch (error) {
        console.log(error);
        res.json({
            message: "Internal Error"
        })
        return
    }
    
}