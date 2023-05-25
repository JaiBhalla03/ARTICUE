import React from 'react';
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import {AiFillHeart} from "react-icons/ai";
import {FaShoppingCart} from "react-icons/fa";

const Artist = ({artist}) => {
    const data = artist.artist;

    console.log(data)
    return (
        <div className="bg-gray-950 text-white py-8 px-4 pt-4 sm:px-16 md:px-24 lg:px-28 sm:py-4 md:py-20">
            <div className="max-w-6xl mx-auto px-4 shadow-gray-800 shadow-sm flex">
                <div className={'p-4 m-4 w-1/3 shadow-sm shadow-gray-800 inline-block'}>
                    <div className="overflow-hidden rounded-sm">
                        <Image
                            src={data.userImage}
                            alt="Artwork"
                            width={350}
                            height={350}
                            className="rounded-sm hover:scale-110 duration-500 transition-all"
                        />
                    </div>
                </div>
                <div className={'px-4 pt-4 m-4 w-2/3 flex flex-col justify-between'}>
                    <div className={'flex flex-col justify-between'}>
                        <div className={'flex'}>
                            <h1 className={'text-4xl'}>{data.fullName}</h1>
                            {/*<p className={'flex text-2xl items-center mx-4'}>*/}
                            {/*    {data.likeCount} <AiFillHeart size={30}/>*/}
                            {/*</p>*/}
                        </div>
                    </div>
                    <div className={'shadow-sm shadow-gray-800 p-2 my-2'}>
                        there is the discription about the artworks but it not yet included it in the schema the manage with this this text
                        there is the discription about the artworks but it not yet included it in the schema the manage with this this text
                        there is the discription about the artworks but it not yet included it in the schema the manage with this this text
                        there is the discription about the artworks but it not yet included it in the schema the manage with this this text
                        there is the discription about the artworks but it not yet included it in the schema the manage with this this text
                        there is the discription about the artworks but it not yet included it in the schema the manage with this this text
                        there is the discription about the artworks but it not yet included it in the schema the manage with this this text
                    </div>
                </div>
            </div>
            <Link className={'float-right text-blue-400 underline'} href={'/Artists'}>Go to Artists</Link>
        </div>
    );
};

export default Artist;

export const getServerSideProps = async({params})=>{
    try{
        const res = await axios.get(`http://localhost:3000/api/artists/${params.id}`);
        return {
            props:{
                artist: res.data,
            }
        }
    }
    catch (err){
        console.error(err)
        return{
            notFound: true
        }
    }
}