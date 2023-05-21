import NextAuth from 'next-auth';
import prisma from '../../../prisma/lib/client'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';



async function getUser(sessionToken){
    try {
        const session = await prisma.session.findUnique({
            where: {
                sessionToken: sessionToken,
            },
            include: {
                user: {
                    include: {
                        artworks: true,
                    },
                },
            },
        });

        if (session && session.user) {
            return session.user;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error retrieving user:', error);
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
        async session(session, user){
            const fullUser = await getUser(session.sessionToken);
            if(fullUser){
                session.user = fullUser;
            }
            return session;
        },
    },
});
