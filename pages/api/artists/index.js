import prisma from '../../../prisma/lib/client'

export default async function handler(req, res){
    if(req.method === 'GET'){
        try{
            const artist = await prisma.user.findMany({
                where:{
                    role: "Seller"
                },
                include:{
                    artworks: true
                }
            });
            return res.status(200).json(artist);
        }
        catch(err){
            console.log(err);
            return res.status(500).json({message: 'Internal server error'});
        }
    }
    else{
        return res.status(405).json({message: 'Method not allowed'});
    }
}