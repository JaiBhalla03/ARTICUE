import prisma from '../../prisma/lib/client'

export default async function handler(req, res){
    if(req.method === 'POST'){
        const {interestType} = req.body;
        console.log(interestType);
        try{
            const artworks = await prisma.artwork.findMany({
                where: {
                    paintingType: interestType
                }
            })
            return res.status(200).json(artworks);
        }
        catch(err){
            console.log(err);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }
    else{
        return res.status(405).json({message: 'Method not allowed'});
    }
}