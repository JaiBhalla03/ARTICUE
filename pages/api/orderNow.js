// Example API route (pages/api/orders.js)
import prisma from '../../prisma/lib/client';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { userId, cartItems } = req.body;

        try {
            console.log('Received request:', { userId, cartItems });

            // Create an order
            const order = await prisma.order.create({
                data: {
                    userId,
                    artworks: { // Corrected: Use the artworks field to associate OrderArtwork instances
                        create: cartItems.map(cartItem => ({
                            artworkId: cartItem.artworkId,
                        })),
                    },
                },
                include: {
                    artworks: true, // Include artworks in the response
                },
            });

            // Remove cart items
            await prisma.cartItem.deleteMany({
                where: {
                    userId,
                },
            });

            console.log('Cart items deleted.');

            res.status(200).json({ success: true, order });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Error creating orders' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
