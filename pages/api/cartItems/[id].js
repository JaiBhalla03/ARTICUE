import prisma from '../../../prisma/lib/client';

export default async function handler(req, res) {
    const { id } = req.query;
    console.log(id);
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            include:
                {
                    cartItems:{
                        include: {
                            artwork: true
                        }
                    }
                },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cartItems = user.cartItems;

        res.json({ cartItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
