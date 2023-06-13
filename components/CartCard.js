import React from 'react';
import Image from "next/image";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import lol from '../images/user.png'
const CartCard = ({name, price, artistName, id}) => {
    return (
        <div className={'shadow-sm shadow-gray-800 p-4 flex justify-between'}>
            <Image src={lol} alt={''} className={'rounded-full'} width={80} height={80}/>
            <div>
                <h1>{name}</h1>
                <p>{price}</p>
                <p>{artistName}</p>
            </div>
            <div className={'hover:scale-110 duration-300 transition-all transform hover:text-red-600 hover:animate-pulse active:scale-95'}>
                <AiFillDelete size={35}/>
            </div>
        </div>
    );
};

export default CartCard;