import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';
import prisma from '../../prisma/lib/client';
import { signIn } from 'next-auth/react';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password, role, interestType } = req.body;
        try {
            const existingUser = await prisma.user.findUnique({ where: { username } });
            if (existingUser) {
                return res.status(400).json({ message: 'Username already present' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            // Create the user
            const newUser = await prisma.user.create({
                data: {
                    username,
                    password: hashedPassword,
                    role,
                    interestType,
                },
            });

            // Create the session
            const session = await signIn('credentials', {
                username,
                password,
                redirect: false,
            });

            // Create the account
            const account = await prisma.account.create({
                data: {
                    userId: newUser.id,
                },
            });

            res.status(200).json({ redirect: '/', user: newUser, session, account });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred during the registration' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
