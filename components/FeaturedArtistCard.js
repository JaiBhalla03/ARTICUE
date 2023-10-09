import img from '../images/art1.jpg'
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {FaShoppingCart} from "react-icons/fa";
import {AiFillHeart} from "react-icons/ai";
import Link from "next/link";
import {MdMore} from "react-icons/md";
import {useSession} from "next-auth/react";
import axios from "axios";
//import imag from '../images/featured.png';

const FeaturedArtistCard = ({id, name , imag, likeCount, price, discount, artist, paintingType}) => {
    const {data ,status} = useSession();
    const userID = data?.user?.id;
    const [isLiked, setIsLiked] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        const checkIfInCart = async () => {
            try {
                const res = await axios.post('/api/checkInCart', { userId: userID, artworkId: id });
                setIsInCart(res.data.inCart);
            } catch (err) {
                console.error(err);
            }
        };
        const checkIfLiked = async () => {
            try {
                const res = await axios.post('/api/checkIfLiked', { userId: userID, artworkId: id });
                setIsLiked(res.data.isLiked);
            } catch (err) {
                console.error(err);
            }
        };
        checkIfLiked();
        checkIfInCart();
    }, [userID, id]);

    const handleLike = async () => {
        try {
            console.log(userID, id);
            const res = await axios.post('/api/likeArtwork', { userId: userID, artworkId: id });

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
            console.log(userID, id);
            const res = await axios.post('/api/addToCart', {userId: userID, artworkId: id});
            console.log(res);
        }
        catch(err){
            console.error(err);
        }
    }
    return (
        <>
            <div className="h-96 w-80 text-xl m-2 overflow-hidden rounded-sm relative group">
                <Image
                    src={imag}
                    alt="Artwork"
                    fill
                    className="h-full w-auto group rounded-sm group-hover:scale-110 duration-500 transition-all"
                />
                <div className="absolute p-4 flex flex-col inset-0 justify-between bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className={'flex justify-end'}>
                        <span className={'inline w-max-xl bg-gray-950 p-2 shadow-gray-800 shadow-sm'}>
                            {name}
                            <div className={'text-blue-500 underline'}>{paintingType}</div>
                        </span>
                    </div>
                    <div className={'flex justify-around'}>
                        <button title={'Add the cart'} onClick={handleAddCart}>
                            <FaShoppingCart
                                className={`text-white hover:scale-105 active:scale-95 transform transition-all duration-100 ${
                                    isInCart ? 'text-yellow-300' : ''
                                }`}
                                size={35}
                            />
                        </button>
                        <button title={'Like'} onClick={handleLike}>
                            <AiFillHeart className={`hover:scale-105 active:scale-95 transform transition-all duration-100 ${isLiked ? 'text-pink-500' : 'text-white'}`} size={35} />
                        </button>
                        <Link href={`/Artworks/${id}`} title={'More Details'}>
                            <MdMore className={'text-white hover:scale-105 active:scale-95 hover:text-gray-200 transform transition-all duration-100'} size={35}/>
                        </Link>
                    </div>
                    <div className={'flex justify-between'}>
                        <h1 className={'text-blue-500 hover:scale-110 underline transform transition-all duration-500 cursor-pointer'} title={'Know-more'}>{artist}</h1>
                        <p className={'bg-gray-950 p-1 shadow-gray-800 shadow-sm'}>₹{price}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FeaturedArtistCard;
