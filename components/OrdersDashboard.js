import React, {useEffect, useState} from 'react';
import OrderDashboard from "./OrderDashboard";
import axios from "axios";
import {useSession} from "next-auth/react";
import {HiEmojiSad} from "react-icons/hi";

const OrdersDashboard = () => {

    const [orderDetails, setOrderDetails] = useState(null);
    const { data: session, status } = useSession();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try{
                const res = await axios.get('/api/getOrders');
                const filteredOrders = res.data.orders.filter(order => order.artwork.userId === session?.user?.id);
                setOrderDetails(filteredOrders);
            }
            catch(err){
                console.error(err);
                setOrderDetails(null);
            }
        }
        fetchOrderDetails();
    }, [session]);

    const removeFromOrder = (itemId) => {
        setOrderDetails((prevDetails) => prevDetails.filter((item) => item.id !== itemId));
    };

    return (
        <>
            <div className={'relative shadow-gray-800 shadow-sm my-4 h-[350px] p-4 mt-2 overflow-y-scroll custom-scrollbar'}>
                <div className={'top-0 sticky shadow-sm shadow-gray-800 z-10 bg-gray-950 p-4 rounded-sm'}>
                    <div className={'w-full z-10 text-3xl'}>Your current orders!</div>
                </div>
                {
                    (orderDetails)?(
                        <div className={''}>
                            {orderDetails.length === 0 && (
                                <div className={'text-gray-700 flex h-[200px] justify-center gap-2 flex-col items-center'}>
                                    <HiEmojiSad size={100}/>
                                    <div className={'text-sm md:text-md'}>
                                        You have no orders
                                    </div>
                                </div>
                            )}
                            {
                                orderDetails?.map((orderDetail)=>(
                                    <OrderDashboard
                                        id={orderDetail.id}
                                        imageUrl={orderDetail.artwork.imageUrl}
                                        artworkName={orderDetail.artwork.name}
                                        customerName={orderDetail.order.user.fullName}
                                        address={orderDetail.order.user.address}
                                        price={orderDetail.artwork.price}
                                        createdAt={orderDetail.order.createdAt}
                                        removeFromOrder={removeFromOrder}
                                    />
                                ))
                            }
                        </div>
                    ):(
                        <div>
                            <div className={'h-16 bg-gray-800 rounded-sm dark:bg-gray-900 animate-pulse w-full my-2'}></div>
                            <div className={'h-16 bg-gray-800 rounded-sm dark:bg-gray-900 animate-pulse w-full my-2'}></div>
                            <div className={'h-16 bg-gray-800 rounded-sm dark:bg-gray-900 animate-pulse w-full my-2'}></div>
                        </div>
                    )
                }

            </div>
        </>
    );
};

export default OrdersDashboard;