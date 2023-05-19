import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '../../../prisma/lib/client';


async function getUser(sessionToken){
    try{
        const session = await prisma.session.findUnique({
            where:{
                sessionToken: sessionToken,
            },
            include: {
                user: true,
            },
        });
        if(session && session.user){
            return session.user;
        }
        else{
            return null;
        }
    }
    catch(error){
        console.error('error retrieving user: ', error);
        return null;
    }
}


export default NextAuth({
    secret: process.env.AUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        /**
         * @param  {object} session      Session object
         * @param  {object} token        User object    (if using database sessions)
         *                               JSON Web Token (if not using database sessions)
         * @return {object}              Session that will be returned to the client
         */
        async session(session) {
            // Add property to session, like an access_token from a provider.
            const user = await getUser(session.sessionToken);
            if(user){
                session.user.fullName = user.fullName;
                session.user.address = user.address;
                session.user.phoneNumber = user.phoneNumber;
            }
            return session
        }
    }
});
