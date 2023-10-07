import prisma from '../../prisma/lib/client';

export default async function handler(req, res){
    if(req.method === 'POST'){
        const {userId, artworkId} = req.body;
        try{
            const isInCart = await prisma.cartItem.findFirst({
                where: {
                    userId: userId,
                    artworkId: artworkId,
                }
            })

            return res.status(200).json({inCart: !!isInCart});
        }
        catch(err){
            console.error(err);
            return res.status(500).json({method: 'Internal Server Error'});
        }
    }
    else{
        return res.status(405).json({method: 'Method not allowed'})
    }
}

