import React from 'react';
import Image from "next/image";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import lol from '../images/user.png'
import axios from "axios";
const CartCard = ({name, price, artistName, id, imageUrl, discount}) => {
    const discountedPrice = (price, discount)=>{
        return Math.floor(price-price*discount*0.01);
    }
    const handleDelete = async(id)=>{
        const data = {id: id};
        console.log(data);
        try{
            const res = await axios.post('/api/deleteCartItem', data);
            console.log(res);
        }
        catch(err){
            console.error(err)
            return new Error(err);
        }
    }
    const deleteItem = ()=>{
        handleDelete(id).then(()=>{
            console.log('cart items deleted!!')
        });
    }
    return (
        <div className={'shadow-sm shadow-gray-800 p-4 flex justify-between'}>
            <Image src={imageUrl} alt={''} className={'rounded-sm'} width={80} height={80}/>
            <div className={'w-1/2'}>
                <h1 className={'text-xl font-bold'}>{name}</h1>
                <div className={'flex'}>
                    <div className={`${discount?'line-through text-gray-800':'text-green-400'}`}>₹{price}</div>
                    {
                        discount?(
                            <div className={'flex gap-2'}>
                                <div className={'text-green-400'}>₹{discountedPrice(price, discount)}</div>
                                <div className={'text-green-400'}>-({discount}%)</div>
                            </div>
                        ):(
                            <></>
                        )
                    }

                </div>
                <div className={'flex gap-2'}>
                    <div>
                        Created By:
                    </div>
                    <div className={'underline'}>
                        {artistName}
                    </div>
                </div>
            </div>
            <div onClick={deleteItem} title={'Remove cart-items'} className={'hover:scale-110 duration-300 transition-all transform hover:text-red-600 hover:animate-pulse active:scale-95'}>
                <AiFillDelete size={25}/>
            </div>
        </div>
    );
};

export default CartCard;