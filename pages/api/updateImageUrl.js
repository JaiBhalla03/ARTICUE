import prisma from '../../prisma/lib/client';

export default async function handler(req, res){
    if(req.method !== 'POST'){
        return res.status(405).json({error: 'Method not allowed'});
    }
    const {userImage, id} = req.body;
    console.log('Received userImage:', userImage);
    console.log('Received id:', id);
    try{
        const updateUser = await prisma.user.update({
            where: {id: id},
            data:{
                userImage: userImage,
            },
        });
        res.status(200).json({message: 'imageUrl updated successfully', updateUser, userImage, id});
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }
}