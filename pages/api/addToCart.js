import prisma from '../../prisma/lib/client';

export default async function handler(req, res) {
    try {
        const { userId, artworkId } = req.body;

        // Retrieve the user and artwork based on the provided IDs
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ error: 'User or artwork not found' });
        }

        // Create the cart item and associate it with the user and artwork
        console.log('We can proceed');
        const cartItem = await prisma.cartItem.create({
            data: {
                userId: user.id,
                artworkId
            },
        });

        return res.status(200).json({ message: 'CartItem created', cartItem });
    } catch (err) {
        console.error('Error adding the cartItem:', err);
        return res.status(500).json({ error: 'An error occurred while adding the cart items' });
    }
}
