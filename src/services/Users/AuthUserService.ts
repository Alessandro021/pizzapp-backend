import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign} from 'jsonwebtoken'

interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({email, password}: AuthRequest){

        //VERIFICAR SE O EMAIL EXISTE.
        const user = await prismaClient.user.findFirst({
            where:{
                email:email
            }
        })

        if(!user){
            throw new Error("Email ou Senha incorreta!")
        }

        //VERIFICAR SE A SENHA ESTA CORRETA
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Senha incorreta!")
        }


        //GERAR UM TOKEN JWT E DOLVER OS DADOS DO USUARIO COM ID, NAME EMAIL
        const token = sign({
            name: user.name,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            subject: user.id,
            expiresIn: '15d'
        }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService}