import {getSession} from 'next-auth/react';
import prisma from '../../prisma/lib/client';

export default async function handler(req, res){
    if(req.method !== 'POST'){
        return res.status(405).json({message: 'Method not allowed'})
    }
    try{
        const {userId} = req.body;
        const likedArtworks = await prisma.like.findMany({
            where: {
                userId: userId,
            },
            include:{
                artwork: true,
            },
        });
        const artworks = likedArtworks.map((like)=>like.artwork);
        return res.status(200).json({artworks});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message: 'Internal server error'});
    }
}