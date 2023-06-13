//creating an api for the liking the artworks
import prisma from '../../prisma/lib/client'

export default async function handler(req ,res){
    try{
        const {userId, artworkId} = req.body;
        //checking is the userId and artworksID exists

        const user  =await prisma.user.findUnique({where: {id: userId}});
        const artwork = await prisma.artwork.findUnique({where: {id: artworkId}});
        if(!user || !artwork){
            return res.status(404).json({error: 'User or the artwork not found'});
        }
        //checking if the like already exists
        const like = await prisma.like.findUnique({
            where: {
                userId_artworkId: {
                    userId: user.id,
                    artworkId: artwork.id,
                },
            },
        });
        if(like){
            //if the user already liked the artwork then we have to remove the like
            await prisma.like.delete({where: {id: like.id}});
            return res.status(200).json({message: 'Artwork unliked successfully'});
        }
        else{
            await prisma.like.create({
                data:{
                    userId: user.id,
                    artworkId: artwork.id,
                }
            })
            return res.status(200).json({message: 'Artwork like successfully'});
        }
    }
    catch(err){
        console.error('error while liking or unliking the artwork', err);
        console.log(1)
        res.status(500).json({error: 'An error occurred while liking/unliking the artwork'});
    }
}