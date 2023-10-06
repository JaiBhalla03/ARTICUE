import prisma from '../../prisma/lib/client';

export default async function handler(req, res){
    if(req.method !== 'POST'){
        return res.status(405).json({error: 'Method not allowed'});
    }
    const {userId, name, imageUrl, price: priceString, discount: discountString, paintingType, artistName, description} = req.body;

    const price = parseInt(priceString);
    const discount = parseFloat(discountString);

    console.log('Received data:', req.body);
    try{
        const artwork = await prisma.artwork.create({
            data:{
                userId,
                name,
                imageUrl,
                price,
                discount,
                paintingType,
                artistName,
                description
            },
        });
        res.status(200).json({message: 'Artworks added successfully', artwork});
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }
}