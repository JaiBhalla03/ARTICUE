import React from 'react';
import axios from 'axios';

const BecomeFeatured = ({id}) => {
    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(id)
        try{
            const res = await axios.post('/api/changeFeaturedAgain', {id});
            console.log(res);
        }
        catch(err){
            console.error(err);
        }
    }
    return (
        <div className={'z-200 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'}>
            <div className="bg-gray-950 shadow-gray-800 shadow-sm rounded-sm p-10 w-10/12 flex flex-col gap-4">
                <h1 className={'text-3xl font-bold'}>
                    Are you sure want to leave featured artist membership!😥
                </h1>
                <div className={'flex justify-center'}>
                    <form onSubmit={handleSubmit}>
                        <button type={'submit'} className={'p-2 shadow-sm shadow-gray-800 hover:scale-110 duration-500 transition-all transform'}>YES</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BecomeFeatured;