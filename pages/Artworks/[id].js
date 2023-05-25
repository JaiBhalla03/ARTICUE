import React, {useEffect} from 'react';
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import {AiFillHeart, AiOutlineShoppingCart} from "react-icons/ai";
import {FaShoppingCart} from "react-icons/fa";

const ArtworkPage= ({artwork}) => {
    console.log(artwork)
    const data = artwork.artwork;
    const discountedPrice = (price, dis)=>{
        return Math.floor(price - price * dis/100);
    }
    return (
        <div className="bg-gray-950 text-white py-8 px-4 pt-4 sm:px-16 md:px-24 lg:px-28 sm:py-4 md:py-20">
            <div className="max-w-6xl mx-auto px-4 shadow-gray-800 shadow-sm flex">
                <div className={'p-4 m-4 w-1/3 shadow-sm shadow-gray-800 inline-block'}>
                    <div className="overflow-hidden rounded-sm">
                        <Image
                            src={data.imageUrl}
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
                            <h1 className={'text-4xl'}>{data.name}</h1>
                            <p className={'flex text-2xl items-center mx-4'}>
                                {data.likeCount} <AiFillHeart size={30}/>
                            </p>
                        </div>
                        <div className={'flex'}>
                            <i>Made by </i> <Link href={`/Artists/${data.userId}`} title={`Know about ${data.artistName}`} className={'text-blue-400 underline ml-1'}> {data.artistName}</Link>.
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
                    <div className={'shadow-sm shadow-gray-800 p-2 my-2 flex justify-between'}>
                        <div className={''}>
                            <div className={'text-2xl'}>
                                Price:
                            </div>
                            {
                                data.discount ?
                                    (<div className={'flex gap-1'}>
                                        <div className={'text-gray-400 opacity-20 line-through'}>₹{data.price}</div>
                                        <div className={'text-green-400'}>₹{discountedPrice(data.price, data.discount)}(-{data.discount}%)</div>
                                    </div>)
                                    : (<div className={'text-green-400'}>₹{data.price}</div>)
                            }
                        </div>
                        <div className={'text-2xl flex items-center mx-2'}>
                            Add to Cart <FaShoppingCart/>
                        </div>
                    </div>
                </div>
            </div>

            <Link className={'float-right text-blue-400 underline'} href={'/Artworks'}>Go to Artworks</Link>
        </div>
    );
};

export default ArtworkPage;

export const getServerSideProps = async({params})=>{
    try{
        const res = await axios.get(`http://localhost:3000/api/artworks/${params.id}`);
        return {
            props:{
                artwork: res.data,
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