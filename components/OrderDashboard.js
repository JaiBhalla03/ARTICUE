import React from 'react';
import {AiFillEye} from "react-icons/ai";

const OrderDashboard = () => {
    return (
        <div className={'flex justify-between shadow-gray-800 shadow-sm h-16 my-2 rounded-sm'}>
            <div className={'flex justify-around w-10/12'}>
                <div className={'flex items-center shadow-sm shadow-gray-800 m-1 px-3'}>
                    [Artworks Name]
                </div>
                <div className={'flex items-center shadow-sm shadow-gray-800 m-1 px-3'}>
                    [Customer Name]
                </div>
                <div className={'flex items-center shadow-sm shadow-gray-800 m-1 px-3'}>
                    [Status]
                </div>
            </div>
            <div className={'flex items-center p-4'}>
                <AiFillEye
                    className={'hover:text-gray-300 hover:scale-110 active:scale-90 duration-300 transform transition-all'}
                    title={'View order details!'}
                    size={35}
                />
            </div>
        </div>
    );
};

export default OrderDashboard;