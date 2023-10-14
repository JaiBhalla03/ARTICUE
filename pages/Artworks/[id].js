import React, {useEffect, useState} from 'react';
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import {AiFillHeart, AiOutlineShoppingCart} from "react-icons/ai";
import {FaShoppingCart} from "react-icons/fa";
import {useSession} from "next-auth/react";

const ArtworkPage= ({artwork}) => {
    console.log(artwork)
    const data1 = artwork.artwork;
    const discountedPrice = (price, dis)=>{
        return Math.floor(price - price * dis/100);
    }
    const {data ,status} = useSession();
    const userID = data?.user?.id;
    const [isLiked, setIsLiked] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        const checkIfInCart = async () => {
            try {
                const res = await axios.post('/api/checkInCart', { userId: userID, artworkId: data1.id });
                setIsInCart(res.data.inCart);
            } catch (err) {
                console.error(err);
            }
        };
        const checkIfLiked = async () => {
            try {
                const res = await axios.post('/api/checkIfLiked', { userId: userID, artworkId: data1.id });
                setIsLiked(res.data.isLiked);
            } catch (err) {
                console.error(err);
            }
        };
        checkIfLiked();
        checkIfInCart();
    }, [userID, data1.id]);

    const handleLike = async () => {
        try {
            console.log(userID, data1.id);
            const res = await axios.post('/api/likeArtwork', { userId: userID, artworkId: data1.id });

            if (res.status === 200) {
                // Toggle the state based on the previous state
                setIsLiked(prevState => !prevState);
                console.log(res);
            } else {
                console.log(res.data.error);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddCart = async()=>{
        try{
            console.log(userID, data1.id);
            const res = await axios.post('/api/addToCart', {userId: userID, artworkId: data1.id});
            console.log(res);
        }
        catch(err){
            console.error(err);
        }
    }


    return (
        <div className="bg-gray-950 text-white py-8 px-4 pt-4 sm:px-16 md:px-24 lg:px-28 sm:py-4 md:py-20">
            <div className="max-w-6xl mx-auto px-4 shadow-gray-800 shadow-sm items-center flex flex-col lg:flex-row">
                <div className={'p-4 m-4 w-full lg:w-1/3 shadow-sm shadow-gray-800 inline-block'}>
                    <div className="overflow-hidden rounded-sm">
                        <Image
                            src={data1.imageUrl}
                            alt="Artwork"
                            width={350}
                            height={350}
                            className="mx-auto rounded-sm hover:scale-110 duration-500 transition-all"
                        />
                    </div>
                </div>
                <div className={'px-4 pt-4 m-4 w-full lg:w-2/3 flex flex-col justify-between'}>
                    <div className={'flex flex-col justify-between'}>
                        <div className={'flex'}>
                            <h1 className={'text-4xl'}>{data1.name}</h1>
                            <p className={'flex text-2xl items-center mx-4'}>
                                <button title={'Like'} onClick={handleLike}>
                                    <AiFillHeart className={`hover:scale-105 active:scale-95 transform transition-all duration-100 ${isLiked ? 'text-pink-500' : 'text-white'}`} size={35} />
                                </button>
                            </p>
                        </div>
                        <div className={'flex'}>
                            <i>Made by </i> <Link href={`/Artists/${data1.userId}`} title={`Know about ${data1.artistName}`} className={'text-blue-400 underline ml-1'}> {data1.artistName}</Link>.
                        </div>
                    </div>
                    <div className={'shadow-sm shadow-gray-800 p-2 my-2'}>
                        {data1.description}
                    </div>
                    <div className={'shadow-sm shadow-gray-800 p-2 my-2 flex justify-between'}>
                        <div className={''}>
                            <div className={'text-2xl'}>
                                Price:
                            </div>
                            {
                                data1.discount ?
                                    (<div className={'flex gap-1'}>
                                        <div className={'text-gray-400 opacity-20 line-through'}>₹{data1.price}</div>
                                        <div className={'text-green-400'}>₹{discountedPrice(data1.price, data1.discount)}(-{data1.discount}%)</div>
                                    </div>)
                                    : (<div className={'text-green-400'}>₹{data1.price}</div>)
                            }
                        </div>
                        <div className={'text-2xl flex items-center mx-2'}>
                            <button title={'Add the cart'} onClick={handleAddCart} className={'group flex items-center gap-2'}>
                                {isInCart ? <>Added To Cart</> : <>Add To Cart</>}
                                <FaShoppingCart
                                    className={`text-white group-hover:scale-105 active:scale-95 transform transition-all duration-100 ${
                                        isInCart ? 'text-yellow-300' : ''
                                }`}
                                size={35}
                                />
                            </button>
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
        const res = await axios.get(`https://articue.vercel.app/api/artworks/${params.id}`);
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