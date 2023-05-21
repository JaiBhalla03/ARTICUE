import prisma from '../../prisma/lib/client'

export default async function handler(req, res){
    if(req.method !== 'POST'){
        return res.status(405).json({message: 'method not allowed'});
    }
            const {userId, artwork} = req.body;
    try{
        const user = await prisma.user.update({
            where: {id: userId},
            data: {artworks: {push: artwork}},
        });
        res.status(200).json({message: 'artworks added successfully', user});
    }
    catch(error){
        console.error('Error adding artwork', error);
        res.status(500).json({message: 'internal server error'});
    }
}