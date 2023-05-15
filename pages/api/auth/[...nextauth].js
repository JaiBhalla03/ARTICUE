import NextAuth from "next-auth";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {prisma} from '../../../prisma/lib/client';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";


export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider(
            {
                credentials:{
                    username: {type: 'text', placeholder: 'test@test.com'},
                    password: {type: 'password', placeholder: 'pa$$word'}
                },
                async authorize(credentials, req){
                    const {username, password} = credentials;
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
