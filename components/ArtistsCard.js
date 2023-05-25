import React from 'react';
import Image from "next/image";
import img from "../images/art1.jpg";
import {AiFillEye} from "react-icons/ai";
import Link from "next/link";


const ArtistsCard = ({userImage, name, numberOfArtworks, id}) => {
    return (
        <div className={'p-2 m-2 shadow-gray-800 shadow-sm rounded-sm inline-block'}>

            <div className="w-80 text-xl m-2 overflow-hidden rounded-sm relative group">
                <Image
                    src={userImage}
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
                        <Link
                            href={`/Artists/${id}`}
                            title={'View Work'}>
                            <AiFillEye className={'text-white hover:scale-105 active:scale-95 hover:text-gray-200 transform transition-all duration-100'} size={35}/>
                        </Link>
                    </div>
                    <div className={'flex justify-between'}>
                        <p className={'bg-gray-950 p-1 shadow-gray-800 shadow-sm'}>{numberOfArtworks} artworks</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtistsCard;