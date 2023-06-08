import prisma from '../../prisma/lib/client';

export default async function handler(req, res){
    try{
        const {userId, artworkId} = req.body;
        //retrieving the user and artworks of the basis of the user and artworks provided
        console.log({userId, artworkId})
        const user = await prisma.user.findUnique({
            where : {id: userId},
        })
        const artwork = await prisma.artwork.findUnique({
            where: {id: artworkId}
        })
        if(!user || !artwork) {
            return res.status(404).json({error: 'User or artwork not found'})
        }
        //creating the cart item and associating with the user and artworks
        console.log('we can proceed')
        const cartItem = await prisma.cartItem.create({
            data:{
                userId: userId,
                artworkId: artworkId
            },
        })
        return res.status(200).json({message: 'cartItem created', cartItem});
    }
    catch(err){
        console.error('error adding the cartItem');
        res.status(500).json({error: 'An error occurred while adding the cart items'});
    }
}