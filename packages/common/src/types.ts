import {email, z} from "zod"

export const SignUpSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(8).max(30)
})

export const SignInSchema = z.object({
    email: z.email(),
    password: z.string()
})

export const CreateRoomSchema = z.object({
    name: z.string().min(3).max(20)
})