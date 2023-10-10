// pages/api/ordersByArtist.js

import prisma from '../../prisma/lib/client';

export default async function handler(req, res) {
    if (req.method === 'GET') {

        try {
            const orders = await prisma.orderArtwork.findMany({
                include: {
                    artwork: true,
                    order: {
                        include: {
                            user: true,
                        }
                    }
                },
            });

            res.status(200).json({ success: true, orders });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Error fetching orders by artist' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
