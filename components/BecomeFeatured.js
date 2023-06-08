import React from 'react';
import Image from "next/image";
import featured from '../images/featured.png'
import axios from "axios";
const BecomeFeatured = ({id}) => {
    const changeFeatured = async(id)=>{
        try{
            const res = await axios.post('/api/changeFeatured', {id});
            console.log(res);
        }
        catch(err){
            console.error(err);
        }
    }
    const handleClick = ()=>{
        changeFeatured(id).then(()=>{
            console.log('user is featured is now true')
        });
    }
    return (
        <div className={'z-200 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'}>
            <div className="bg-gray-950 shadow-gray-800 shadow-sm rounded-sm p-10 w-10/12 flex flex-col gap-4">
                <h1 className={'text-3xl font-bold'}>
                    We are so happy to know that you want our featured artist membership
                </h1>
                <p>
                    These are the packages available for you.
                </p>
                <div className={'flex justify-around'}>
                    <div className={'h-48 w-48 shadow-sm shadow-gray-800 p-2 cursor-pointer'} onClick={handleClick}>
                        <Image src={featured} alt={''} className={'rounded-full h-32 w-32 mx-auto'}/>
                        <div className={'flex items-center justify-center text-xs'}>
                            Enjoy being featured in our landing page so that you can get more buyers
                        </div>
                    </div>
                    <div className={'h-48 w-48 shadow-sm shadow-gray-800 bg-gray-800 animate-pulse flex items-center justify-center'}>
                        Not available 😪
                    </div>
                    <div className={'h-48 w-48 shadow-sm shadow-gray-800 bg-gray-800 animate-pulse flex items-center justify-center'}>
                        Not available 😪
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BecomeFeatured;