import prisma from '../../prisma/lib/client';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { id } = req.body;

        try {
            const deletedOrderArtwork = await prisma.orderArtwork.delete({
                where: {
                    id
                },
            });

            res.status(200).json({ success: true, deletedOrderArtwork });
        } catch (error) {
            console.error('Error deleting orderArtwork:', error);
            res.status(500).json({ success: false, error: 'Error deleting orderArtwork' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
