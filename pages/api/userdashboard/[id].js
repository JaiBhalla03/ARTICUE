import prisma from '../../../prisma/lib/client'

export default async function handler(req, res){
    const {id} = req.query;
    try{
        const user = await prisma.user.findUnique({
            where:{
                id: id,
            },
            include:{
                artworks: true,
                cartItems: true,
                likes: true,
            }
        })
        if(user){
            return res.status(200).json({message : 'got the user details successfully', user});
        }
        else{
            return res.status(400).json({message: 'could not get the user'});
        }
    }
    catch(err){
        return res.status(500).json({error: 'internal server error'});
    }
}