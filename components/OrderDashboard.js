import React from 'react';
import {AiFillDelete} from "react-icons/ai";
import {formatDistanceToNow} from "date-fns";
import Image from 'next/image';
import axios from "axios";

const OrderDashboard = ({id, imageUrl, artworkName, customerName, address, price, createdAt, removeFromOrder}) => {
    function getTimeAgo(creatAt) {
        const currentDate = new Date();
        return formatDistanceToNow(new Date(creatAt), { addSuffix: true, includeSeconds: true });
    }

    const time = getTimeAgo(createdAt);

    const handleDelete = async(id)=>{
        const data = {id: id};
        try{
            const res = await axios.post('/api/deleteOrderArtworks', data);
            console.log(res);
        }
        catch(err){
            console.error(err)
            return new Error(err);
        }
    }

    const deleteItem = () => {
        handleDelete(id).then(() => {
            removeFromOrder(id); // Update local state on successful deletion
            console.log('cart items deleted!!');
        });
    };

    return (
        <div className={'shadow-gray-800 shadow-sm my-2 rounded-sm px-10'}>
            <div className={'flex justify-between items-center'}>
                <div className={'p-1 shadow-sm rounded-sm shadow-gray-800 h-full w-auto'}>
                    <Image src={imageUrl} alt={''} width={40} height={40} className={''}/>
                </div>
                <div>
                    <div className={''}>
                        {artworkName}
                    </div>
                    <div>
                        ₹{price}
                    </div>
                </div>
                <div>
                    <div className={'font-bold'}>
                        {customerName}
                    </div>
                    <div className={''}>
                        {address}
                    </div>
                </div>
                <div onClick={deleteItem}>
                    <AiFillDelete size={30} className={'hover:scale-110 active:scale-95 hover:text-red-500 transition-all duration-300 cursor-pointer'}/>
                </div>
            </div>
            <div className={'flex items-center justify-end p-1 text-gray-600'}>
                {time}
            </div>
        </div>
    );
};

export default OrderDashboard;