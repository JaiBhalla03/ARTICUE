import React, {useEffect, useState} from 'react';
import ArtWorkCard from "../../components/ArtWorkCard";
import GoToTopButton from "../../components/GoToTopButton";
import {FaPaintBrush} from "react-icons/fa";
import {Bounce} from "react-awesome-reveal";
import axios from "axios";


const Home = () => {
    const [isOpenCategory, setIsOpenCategory] = useState(false);
    const [isOpenPrice, setIsOpenPrice] = useState(false);
    const [isOpenArtist, setIsOpenArtist] = useState(false);

    const toggleDropdownCategory = () => {
        setIsOpenCategory(!isOpenCategory);
        setIsOpenPrice(false);
        setIsOpenArtist(false);
    };
    const toggleDropdownPrice = () =>{
        setIsOpenPrice(!isOpenPrice);
        setIsOpenCategory(false);
        setIsOpenArtist(false);
    }
    const toggleDropdownArtist = () =>{
        setIsOpenArtist(!isOpenArtist);
        setIsOpenPrice(false);
        setIsOpenCategory(false);
    }
    const [artData, setArtData] = useState(null);
    useEffect(()=>{
        const fetchArtWorks = async()=>{
            try {
                const res = await axios.get('/api/artworks');
                setArtData(res.data);
            }
            catch(err){
                console.error(err);
                return null;
            }
        }
        fetchArtWorks();
    },[])
    const [artistData, setArtistData] = useState(null);
    useEffect(()=>{
        const fetchArtistName = async()=>{
            try{
                const res = await axios.get('/api/artists')
                setArtistData(res);
            }
            catch(err){
                console.error(err);
                return null;
            }
        }
        fetchArtistName();
    })
    console.log(artData)
    const artists = artistData?.data;
    return (
        <main className={'bg-gray-950 text-white py-8 px-4 pt-4 sm:px-16 md:px-24 lg:px-28 sm:py-4 md:py-20'}>
            <Bounce triggerOnce>
                <h1 className={'my-2 flex text-3xl md:text-5xl font-bold'}>Checkout the artworks <FaPaintBrush className={'text-white mx-2'} size={40}/></h1>
            </Bounce>
            <div className={'mx-2 mb-4 p-4 shadow-sm shadow-gray-800 flex justify-around'}>
                <div className="relative inline-block">
                    <button
                        id="dropdownDelayButton"
                        className="shadow-gray-800 shadow-sm rounded-sm p-2 text-lg"
                        onClick={toggleDropdownCategory}
                    >
                        Category
                    </button>
                    {isOpenCategory && (
                        <div
                            id="dropdownDelay"
                            className="absolute z-10 mt-2 animate-slide-down bg-gray-950 divide-y divide-gray-100 rounded-sm shadow-sm shadow-gray-800 w-44"
                        >
                            <ul className="my-2" aria-labelledby="dropdownDelayButton">
                                <li>
                                    <a href="pages/Artworks#" className="block px-4 py-2 hover:bg-gray-900">
                                        Acrylic
                                    </a>
                                </li>
                                <li>
                                    <a href="pages/Artworks#" className="block px-4 py-2 hover:bg-gray-900">
                                        Oil
                                    </a>
                                </li>
                                <li>
                                    <a href="pages/Artworks#" className="block px-4 py-2 hover:bg-gray-900">
                                        Watercolor
                                    </a>
                                </li>
                                <li>
                                    <a href="pages/Artworks#" className="block px-4 py-2 hover:bg-gray-900">
                                        Pastel
                                    </a>
                                </li>
                                <li>
                                    <a href="pages/Artworks#" className="block px-4 py-2 hover:bg-gray-900">
                                        Encaustic
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="relative inline-block">
                    <button
                        id="dropdownDelayButton"
                        className="shadow-gray-800 shadow-sm rounded-sm p-2 text-lg"
                        onClick={toggleDropdownPrice}
                    >
                        Sort by Price
                    </button>
                    {isOpenPrice && (
                        <div
                            id="dropdownDelay"
                            className="absolute z-10 mt-2 animate-slide-down bg-gray-950 divide-y divide-gray-100 rounded-sm shadow-sm shadow-gray-800 w-44"
                        >
                            <ul className="my-2" aria-labelledby="dropdownDelayButton">
                                <li>
                                    <a href="pages/Artworks#" className="block px-4 py-2 hover:bg-gray-900">
                                        High to Low
                                    </a>
                                </li>
                                <li>
                                    <a href="pages/Artworks#" className="block px-4 py-2 hover:bg-gray-900">
                                        Low to High
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="relative inline-block">
                    <button
                        id="dropdownDelayButton"
                        className="shadow-gray-800 shadow-sm rounded-sm p-2 text-lg"
                        onClick={toggleDropdownArtist}
                    >
                        Artist
                    </button>
                    {isOpenArtist && (
                        <div
                            id="dropdownDelay"
                            className="absolute z-10 mt-2 animate-slide-down bg-gray-950 divide-y divide-gray-100 rounded-sm shadow-sm shadow-gray-800 w-44"
                        >
                            <ul className="my-2" aria-labelledby="dropdownDelayButton">
                                {
                                    artists?.map(artist=>(
                                        <li>
                                            <a href="pages/Artworks#" className="block px-4 py-2 hover:bg-gray-900">
                                                {artist.name}
                                            </a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            {
                artData?(
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {
                            artData?.map((artData1)=>(
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
                ):(
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className={'p-2 m-2 bg-gray-800 dark:bg-gray-900 rounded-sm animate-pulse m-3 h-[400px] w-[350px]'}></div>
                        <div className={'p-2 m-2 bg-gray-800 dark:bg-gray-900 rounded-sm animate-pulse m-3 h-[400px] w-[350px]'}></div>
                        <div className={'p-2 m-2 bg-gray-800 dark:bg-gray-900 rounded-sm animate-pulse m-3 h-[400px] w-[350px]'}></div>
                        <div className={'p-2 m-2 bg-gray-800 dark:bg-gray-900 rounded-sm animate-pulse m-3 h-[400px] w-[350px]'}></div>
                        <div className={'p-2 m-2 bg-gray-800 dark:bg-gray-900 rounded-sm animate-pulse m-3 h-[400px] w-[350px]'}></div>
                        <div className={'p-2 m-2 bg-gray-800 dark:bg-gray-900 rounded-sm animate-pulse m-3 h-[400px] w-[350px]'}></div>
                    </div>
                )
            }

            <div className="fixed bottom-4 right-4 z-30">
                <GoToTopButton/>
            </div>
        </main>
    );
};

export default Home;