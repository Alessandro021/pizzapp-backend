import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    async execute({name, email,password}:UserRequest){
        
        //VERIFICAR SE UM EMAIL FOI EM+NVIADO
        if(!email){
            throw new Error("Email incorreto")
        }

        //VERIFICAR SE O EMAIL ESTA NO BANCO DE DADOS
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExists){
            throw new Error("Esse email já esta cadastrado!")
        }

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash,
            },
            select:{
                id: true,
                name: true,
                email: true
            }
        })

        return user
    }
}

export { CreateUserService }