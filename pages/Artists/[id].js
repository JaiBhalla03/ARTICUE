import React from 'react';
import axios from "axios";
import Link from "next/link";

const Artist = ({artist}) => {
    return (
        <div>
            {JSON.stringify(artist)}
            <Link className={'text-blue-400 underline'} href={'/Artists'}>Go to Artists</Link>
        </div>
    );
};

export default Artist;

export const getServerSideProps = async({params})=>{
    try{
        const res = await axios.get(`http://localhost:3000/api/artists/${params.id}`);
        return {
            props:{
                artist: res.data,
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