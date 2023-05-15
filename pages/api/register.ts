import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import {v4 as uuid} from 'uuid'

const allowedType = ['Oil Painters', 'Watercolor Painters', 'Acrylic Painters', 'Pastel Painters', 'Encaustic Painters'];

const prisma = new PrismaClient();

export default async function registerUser(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { username, password, interestType } = req.body;

    // Validation
    if (!/^[a-z0-9_-]{3,15}$/g.test(username)) {
        return res.status(400).send({ user: null, message: 'Invalid username' });
    }
    if (password?.length < 5) {
        return res.status(400).send({ user: null, message: 'Password should be minimum 5 characters' });
    }
    if (!allowedType.includes(interestType)) {
        return res.status(400).send({ user: null, message: `Invalid interest type. Allowed types are: ${allowedType.join(', ')}` });
    }

    const user = await prisma.user.findUnique({
        where: { username },
    });

    if (user !== null) {
        return res.send({ user: null, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
            interestType,
        },
    });

    const sessionToken = uuid();
    const sessionExpires = new Date(Date.now() + 30*24*60*60*1000);

    const newSession = await prisma.session.create({
        data:{
            sessionToken,
            expires: sessionExpires,
            user: {connect: {id: newUser.id}},
        }
    })

    const newAccount = await prisma.account.create({
        data: {
            userId: newUser.id,
            type: 'email',
            provider: 'local',
        }
    })

    return res.send({ user: newUser, session: newSession, account:newAccount, message: 'User created successfully' });
}
