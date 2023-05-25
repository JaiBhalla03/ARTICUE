import React, {useEffect} from 'react';
import axios from "axios";
import Link from "next/link";

const ArtworkPage= ({artwork}) => {
    console.log(artwork)
    return (
        <div>
            {JSON.stringify(artwork)}
            <Link className={'text-blue-400 underline'} href={'/Artworks'}>Go to Artworks</Link>
        </div>
    );
};

export default ArtworkPage;

export const getServerSideProps = async({params})=>{
    try{
        const res = await axios.get(`http://localhost:3000/api/artworks/${params.id}`);
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