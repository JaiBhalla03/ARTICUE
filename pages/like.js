import React, {useEffect, useState} from 'react';
import {useSession} from "next-auth/react";
import axios from "axios";
import {FaPaintBrush} from "react-icons/fa";
import {Bounce} from "react-awesome-reveal";
import ArtWorkCard from "../components/ArtWorkCard";
import GoToTopButton from "../components/GoToTopButton";
import {HiEmojiSad} from "react-icons/hi";

const Like = () => {
    const {data: session} = useSession();
    const [likedArtworks, setLikedArtworks] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post(`/api/likedArtworks`, {userId: session?.user?.id});
                setLikedArtworks(res.data);
            } catch (err) {
                console.error(err);
                setLikedArtworks(null);
            }
        };
        fetchData();
    }, [likedArtworks]);
    console.log(likedArtworks);
    return (
        <main className={'bg-gray-950 text-white py-8 px-4 pt-4 sm:px-16 md:px-24 lg:px-28 sm:py-4 md:py-20'}>
            <Bounce triggerOnce>
                <h1 className={'my-2 flex text-3xl md:text-5xl font-bold'}>Liked Artworks <FaPaintBrush className={'text-white mx-2'} size={40}/></h1>
            </Bounce>
            {
                likedArtworks?(
                    <>
                        <div>
                            {likedArtworks.length === 0 && (
                                <div className={'my-10 text-gray-700 flex h-full justify-center gap-2 flex-col items-center'}>
                                    <HiEmojiSad size={100}/>
                                    <div className={'text-sm md:text-md'}>
                                        You have not liked any artworks
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {
                                likedArtworks?.map((artData1)=>(
                                    <ArtWorkCard
                                        id = {artData1.id}
                                        imageUrl={artData1.imageUrl}
                                        name={artData1.name}
                                        price={artData1.price}
                                        artistName={artData1.artistName}
                                        paintingType={artData1.paintingType}
                                    />
                                ))
                            }
                        </div>
                    </>
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
            <div className="fixed bottom-4 right-4 z-30">
                <GoToTopButton/>
            </div>
        </main>
    );
};

export default Like;