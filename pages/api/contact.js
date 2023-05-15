import prisma from '../../prisma/lib/client';

export default async function handler(req ,res){
    if(req.method === 'POST'){
        const {name, email, message} = req.body;
        try{
            const contact = await prisma.contact.create({
                data:{
                    name, email, message
                }
            })
            res.status(200).json({message: 'contact form submitted successfully'});
        }
        catch(error){
            console.error(error);
            res.status(500).json({message: 'An error occurred while submitting the form'});
        }
    }
    else{
        res.status(405).json({message: 'Method not allowed'});
    }
}