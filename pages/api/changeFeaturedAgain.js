import prisma from '../../prisma/lib/client'

export default async function handler(req, res){
    if(req.method !== 'POST'){
        return res.status(405).json({error: 'method not allowed'});
    }
    try {
        const {id} = req.body;

        const updateUser = await prisma.user.update({
            where: {
                id
            },
            data: {
                isFeatured: false
            }
        })
        return res.status(200).json({message: 'User now successfully modify as a featured artist', updateUser})
    }
    catch(err){
        return res.status(500).json({error: 'Internal server error'});
    }
}