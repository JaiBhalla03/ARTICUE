import React, {useState} from 'react';
import OrderDashboard from "./OrderDashboard";

const OrdersDashboard = () => {
    const [orderDetails, setOrderDetails] = useState(null);

    return (
        <>

            <div className={'relative shadow-gray-800 shadow-sm my-4 h-[350px] p-4 mt-2 overflow-y-scroll custom-scrollbar'}>
                <div className={'top-0 shadow-sm shadow-gray-800 z-10 bg-gray-950 p-4 rounded-sm'}>
                    <h1 className={'text-3xl'}>Your current orders!</h1>
                </div>
                {
                    (orderDetails)?(
                        <div className={''}>
                            <OrderDashboard/>
                            <OrderDashboard/>
                            <OrderDashboard/>
                            <OrderDashboard/>
                            <OrderDashboard/>
                            <OrderDashboard/>
                            <OrderDashboard/>
                            <OrderDashboard/>
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