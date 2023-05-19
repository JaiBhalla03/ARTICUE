import prisma from '../../prisma/lib/client';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, role, interestType } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { email },
            data: { role, interestType },
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
