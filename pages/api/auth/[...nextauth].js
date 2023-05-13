import NextAuth from "next-auth";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {PrismaClient} from '@prisma/client';
import CredentialsProvider from "next-auth/providers/credentials";
import {z} from "zod";
import bcrypt from "bcryptjs";

const loginUserSchema = z.object({
    username: z.string().regex(/^[a-z0-9_-]{3,15}$/g,'Invalid username'),
    password: z.string().min(5, 'Password should be minimum 5 characters'),
})

const prisma = new PrismaClient();

const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider(
            {
                credentials:{
                    username: {type: 'text', placeholder: 'test@test.com'},
                    password: {type: 'password', placeholder: 'pa$$word'}
                },
                async authorize(credentials, req){
                    const {username, password} = loginUserSchema.parse(credentials);
                    const user = await prisma.user.findUnique({
                        where: {username},
                    });
                    if(!user) {
                        return null;
                    }
                    const isPasswordValid = await bcrypt.compare(password, user.password)
                    if(!isPasswordValid) return null;
                    return user;
                },
            }
        )
    ],
    callbacks:{
        session({session, token}){
            session.user.id = token.id;
            session.user.username = token.username;
            return session;
        },
        jwt({token, account, user}){
            if(account){
                token.accessToken = account.access_token;
                token.id = user.id;
                token.username = user.username;
            }
            return token;
        }
    }
}

export default NextAuth(authOptions);