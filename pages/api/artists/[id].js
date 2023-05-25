import prisma from '../../../prisma/lib/client';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Wrong request!' });
    } else {
        const { id } = req.query;
        console.log(id)
        try {
            const artist = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });

            if (artist) {
                return res.status(200).json({
                    message: 'Artist details found successfully',
                    artist,
                });
            } else {
                return res.status(404).json({
                    error: 'Artist not found',
                });
            }
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}
