import React, {useEffect, useState} from 'react';
import FeaturedArtist from "./FeaturedArtist";
import {FaPaintBrush} from "react-icons/fa";
import {Fade, Bounce} from 'react-awesome-reveal';
import axios from "axios";


const FeaturedArtists = () => {
    const [artistData, setArtistData] = useState(null);
    useEffect(()=>{
        const fetchArtWorks = async()=>{
            try {
                const res = await axios.get('/api/featuredArtist');
                setArtistData(res.data);
            }
            catch(err){
                console.error(err);
                return null;
            }
        }
        fetchArtWorks();
    },[])
    console.log(artistData)
    return (
        <div className={'py-8 px-4 pt-4 sm:px-16 md:px-24 lg:px-26 sm:py-4 md:py-10 '}>
            <Bounce triggerOnce>
                <h1 className={'md:mx-4 flex text-3xl md:text-5xl font-bold'}>Featured Artists <FaPaintBrush className={'text-white mx-2'} size={40}/></h1>
            </Bounce>
            {
                artistData?.map((artist_featured)=>(
                    <Fade delay={150} triggerOnce>
                        <FeaturedArtist name={artist_featured.fullName} artworks={artist_featured.artworks}/>
                    </Fade>
                ))
            }
        </div>
    );
};

export default FeaturedArtists;