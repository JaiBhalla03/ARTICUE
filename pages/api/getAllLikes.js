import prisma from '../../prisma/lib/client';

export default async function handler(req, res){
    const {userId} = req.body;
    try{
        const getAllLikes = await prisma.like.findMany({
            where:{
                userId: userId,
            },
        })
        return res.status(200).json({message: 'All likes fetched successfully', getAllLikes});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message: 'Internal server error!'});
    }
}