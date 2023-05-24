import prisma from '../../prisma/lib/client';

export default async function updateArtwork(req, res) {
    const { id, name, imageUrl, price: priceString, discount: discountString, paintingType } = req.body;
    const price = parseInt(priceString);
    const discount = parseFloat(discountString);
    try {
        const updatedArtwork = await prisma.artwork.update({
            where: { id },
            data: { name, imageUrl, price, discount, paintingType },
        });

        res.status(200).json(updatedArtwork);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update artwork' });
    }
}
