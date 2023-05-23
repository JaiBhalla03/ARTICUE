import prisma from '../../prisma/lib/client';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { id } = req.body;

    try {
        const deletedArtwork = await prisma.artwork.delete({
            where: {
                id: id,
            },
        });

        res.status(200).json({ message: 'Artwork deleted successfully', deletedArtwork });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
