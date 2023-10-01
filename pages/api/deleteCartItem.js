import prisma from '../../prisma/lib/client'

export default async function handler(req, res){
    const {id} = req.body;
    try{
        const cartItem = await prisma.cartItem.findUnique({
            where: {
                id: id
            }
        });
        console.log('working-1')
        if(!cartItem){
            return res.status(404).json({message: 'Cart item not found'});
        }
        console.log('working-2')
        const cartItem1 = await prisma.cartItem.delete({
            where: {
                id: id,
            },
        });
        console.log('working-3')
        return res.status(200).json({message: 'Cart items deleted successfully', cartItem1});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
}