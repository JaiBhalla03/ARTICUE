import React from 'react';
import Image from "next/image";
import img from "../images/art1.jpg";
import {FaShoppingCart} from "react-icons/fa";
import {AiFillHeart} from "react-icons/ai";
import {MdMore} from "react-icons/md";
import Link from "next/link";

const ArtWorkCard = ({id,imageUrl, name, artistName, price}) => {
    return (
        <div className={'p-2 m-2 shadow-gray-800 shadow-sm rounded-sm inline-block h-[400px] w-[350px]'}>
            <div className={''}>
                <div className="w-80 text-xl m-2 overflow-hidden rounded-sm relative group">
                    <Image
                        src={imageUrl}
                        alt="Artwork"
                        width={350}
                        height={350}
                        className="group rounded-sm group-hover:scale-110 duration-500 transition-all"
                    />
                    <div className="absolute p-4 flex flex-col inset-0 justify-between bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className={'flex justify-end'}>
                            <span className={'w-max-xl bg-gray-950 p-2 shadow-gray-800 shadow-sm'}>{name}</span>
                        </div>
                        <div className={'flex justify-around'}>
                            <button title={'Add the cart'}><FaShoppingCart className={'text-white hover:scale-105 active:scale-95 hover:text-gray-200 transform transition-all duration-100'} size={35}/></button>
                            <button title={'Like'}><AiFillHeart className={'text-white hover:scale-105 active:scale-95 hover:text-gray-200 transform transition-all duration-100'} size={35}/></button>
                            <Link href={`/Artworks/${id}`} title={'More Details'}>
                                <MdMore className={'text-white hover:scale-105 active:scale-95 hover:text-gray-200 transform transition-all duration-100'} size={35}/>
                            </Link>
                        </div>
                        <div className={'flex justify-between'}>
                            <h1 className={'text-blue-500 hover:scale-110 underline transform transition-all duration-500 cursor-pointer'} title={'Know-more'}>{artistName}</h1>
                            <p className={'bg-gray-950 p-1 shadow-gray-800 shadow-sm'}>₹{price}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtWorkCard;