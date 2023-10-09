// pages/api/checkIfLiked.js
import prisma from '../../prisma/lib/client';

export default async function handler(req, res) {
    try {
        const { userId, artworkId } = req.body;

        // Check if the like exists
        const like = await prisma.like.findUnique({
            where: {
                userId_artworkId: {
                    userId,
                    artworkId,
                },
            },
        });

        const isLiked = Boolean(like);

        res.status(200).json({ isLiked });
    } catch (err) {
        console.error('Error while checking if liked:', err);
        res.status(500).json({ error: 'An error occurred while checking if liked.' });
    }
}
