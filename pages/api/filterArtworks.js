// pages/api/filterArtworks.js

import prisma from '../../prisma/lib/client';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { category, sortBy, artist } = req.body;

        try {
            let whereConditions = {};
            let orderByOptions = {};

            // Add conditions based on the filter parameters
            if (category) {
                whereConditions.paintingType = category;
            }

            if (artist) {
                whereConditions.artistName = artist;
            }

            // Add sorting options based on the sortBy parameter
            if (sortBy === 'price-high-to-low') {
                orderByOptions.price = 'desc';
            } else if (sortBy === 'price-low-to-high') {
                orderByOptions.price = 'asc';
            }

            let artworks = await prisma.artwork.findMany({
                where: whereConditions,
                include: {
                    user: true,
                    cartItems: true,
                    likes: true,
                    orders: true,
                },
                orderBy: orderByOptions,
            });

            res.status(200).json({ success: true, artworks });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Error filtering artworks' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
