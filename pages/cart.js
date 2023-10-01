import React, {useEffect, useState} from 'react';
import {useSession} from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import CartCard from "../components/CartCard";

const Cart = () => {
    const {data:session} = useSession();
    const [details, setDetails] = useState(null);

    console.log(session)
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`/api/cartItems/${session?.user?.id}`);
                setDetails(res.data);
            } catch (err) {
                console.error(err);
                setDetails(null);
            }
        };
        fetchUserData();
    }, [session]);
    const totalAmount = (arr)=>{
        let sum = 0;
        for(let i = 0;i<arr?.length;i++){
            sum += arr[i]?.artwork?.price;
        }
        return sum;
    }
    const totalDiscountedPrice = (arr)=>{
        let sum = 0;
        for (let i=0;i<arr?.length;i++){
            sum += arr[i]?.artwork?.price - arr[i].artwork?.discount*arr[i]?.artwork?.price*0.01;
        }
        return sum;
    }
    const total = totalAmount(details?.cartItems);
    const totalDiscounted = totalDiscountedPrice(details?.cartItems);
    console.log(1)
    console.log(details);
    const items = details?.cartItems;
    return (
        <div className="bg-gray-950 text-white py-8 px-4 pt-4 sm:px-16 md:px-24 lg:px-28 sm:py-4 md:py-10">
            <div className="max-w-6xl mx-auto p-4 shadow-gray-800 shadow-sm my-4">
                <h1 className={'text-5xl font-bold'}>
                    Your Cart 🛒
                </h1>
                <div className={'flex flex-col lg:flex-row justify-between shadow-sm shadow-gray-800 p-2 mt-4'}>
                    <div className={'p-2 shadow-sm shadow-gray-800 w-full lg:w-1/2 h-96 custom-scrollbar overflow-scroll'}>
                        <h2 className={'text-2xl font-thin sticky top-0 z-10 bg-gray-950'}>Selected Items</h2>
                        <div className={''}>
                            {
                                details?.cartItems ? (
                                    <div className={'flex flex-col gap-2'}>
                                        {
                                            items.map((item)=>(
                                                <CartCard
                                                    name={item.artwork.name}
                                                    price={item.artwork.price}
                                                    artistName={item.artwork.artistName}
                                                    id={item.id}
                                                    imageUrl={item.artwork.imageUrl}
                                                    discount={item.artwork.discount}
                                                />
                                            ))
                                        }
                                    </div>
                                ) : (
                                    <div className={'flex flex-col gap-2'}>
                                        <div className={'p-8 bg-gray-800 animate-pulse rounded-sm'}></div>
                                        <div className={'p-8 bg-gray-800 animate-pulse rounded-sm'}></div>
                                        <div className={'p-8 bg-gray-800 animate-pulse rounded-sm'}></div>
                                        <div className={'p-8 bg-gray-800 animate-pulse rounded-sm'}></div>
                                        <div className={'p-8 bg-gray-800 animate-pulse rounded-sm'}></div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className={'p-8 text-2xl flex flex-col gap-2 lg:gap-1 justify-around shadow-sm shadow-gray-800 w-full lg:w-1/2'}>
                        <p className={'w-full p-2 shadow-gray-800 shadow-sm rounded-sm'}>Total Items: {items?.length} items</p>
                        <p className={'w-full p-2 shadow-gray-800 shadow-sm rounded-sm'}>Amount(no discount): ₹{total}</p>
                        <p className={'w-full p-2 shadow-gray-800 shadow-sm rounded-sm'}>After discount: ₹{totalDiscounted.toFixed(2)}</p>
                        <p className={'w-full p-2 shadow-gray-800 shadow-sm rounded-sm'}>You saved ₹{(total - totalDiscounted).toFixed(2)} 🥳</p>
                        <div className={'flex justify-center'}>
                            <button className={'text-white p-4 text-xl transition-all duration-500 text-white bg-gray-950 shadow-sm shadow-gray-800 rounded-sm hover:scale-110 active:scale-90'}>Order Now!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;