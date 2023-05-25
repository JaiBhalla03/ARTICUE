import prisma from '../../../prisma/lib/client';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Wrong request!' });
    } else {
        const { id } = req.query;
        console.log(id)
        try {
            const artwork = await prisma.artwork.findUnique({
                where: {
                    id: id,
                },
            });

            if (artwork) {
                return res.status(200).json({
                    message: 'Artwork details found successfully',
                    artwork,
                });
            } else {
                return res.status(404).json({
                    error: 'Artwork not found',
                });
            }
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}
