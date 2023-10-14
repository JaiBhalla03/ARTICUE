import React, {useEffect, useState} from 'react';
import ArtistsCard from "../../components/ArtistsCard";
import {FaPaintBrush} from "react-icons/fa";
import {Bounce} from "react-awesome-reveal";
import axios from "axios";

const Index = () => {
    const [artistData, setArtistData] = useState(null);
    useEffect(()=>{
        const fetchArtWorks = async()=>{
            try {
                const res = await axios.get('/api/artists');
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
        <main className={'bg-gray-950 text-white py-8 px-4 pt-4 sm:px-16 md:px-24 lg:px-28 sm:py-4 md:py-20'}>
            <Bounce triggerOnce>
                <h1 className={'my-2 flex text-3xl md:text-5xl font-bold'}>Checkout our artists <FaPaintBrush className={'text-white mx-2'} size={40}/></h1>
            </Bounce>
            {
                artistData?(
                    <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
                        {artistData?.map((artist1)=>(
                            <div key={artist1.id}>
                                <ArtistsCard
                                    userImage={artist1.userImage}
                                    name={artist1.name}
                                    numberOfArtworks={artist1.artworks.length}
                                    id={artist1.id}
                                />
                            </div>
                        ))}
                    </div>
                ):(
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className={'mx-auto p-2 m-2 bg-gray-800 dark:bg-gray-900 rounded-sm animate-pulse m-3 h-[400px] w-[350px]'}></div>
                        <div className={'mx-auto p-2 m-2 bg-gray-800 dark:bg-gray-900 rounded-sm animate-pulse m-3 h-[400px] w-[350px]'}></div>
                        <div className={'mx-auto p-2 m-2 bg-gray-800 dark:bg-gray-900 rounded-sm animate-pulse m-3 h-[400px] w-[350px]'}></div>
                        <div className={'mx-auto p-2 m-2 bg-gray-800 dark:bg-gray-900 rounded-sm animate-pulse m-3 h-[400px] w-[350px]'}></div>
                        <div className={'mx-auto p-2 m-2 bg-gray-800 dark:bg-gray-900 rounded-sm animate-pulse m-3 h-[400px] w-[350px]'}></div>
                        <div className={'mx-auto p-2 m-2 bg-gray-800 dark:bg-gray-900 rounded-sm animate-pulse m-3 h-[400px] w-[350px]'}></div>
                    </div>
                )
            }

        </main>
    );
};

export default Index;