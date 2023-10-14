import React, {useEffect, useState} from 'react';
import ArtWorkCard from "../../components/ArtWorkCard";
import GoToTopButton from "../../components/GoToTopButton";
import {FaPaintBrush} from "react-icons/fa";
import {Bounce} from "react-awesome-reveal";
import axios from "axios";
import {useSession} from "next-auth/react";


const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSortOption, setSelectedSortOption] = useState(null);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [isOpenCategory, setIsOpenCategory] = useState(false);
    const [isOpenPrice, setIsOpenPrice] = useState(false);
    const [isOpenArtist, setIsOpenArtist] = useState(false);
    const [likeData, setLikeData] = useState(null);
    const [artData, setArtData] = useState(null);
    const [artistData, setArtistData] = useState(null);
    const [filterParams, setFilterParams] = useState({
        category: null,
        sortBy: null,
        artist: null,
    });

    const {data ,status} = useSession();
    const userID = data?.user?.id;

    const fetchFilteredArtWorks = async()=>{
        try{
            const res = await axios.post('/api/filterArtworks', filterParams);
            setArtData(res.data.artworks);
        }
        catch(err){
            console.error(err);
        }
    }

    const applyCategoryFilter = (category) => {
        setSelectedCategory(category);
        setFilterParams({
            ...filterParams,
            category,
        });
        fetchFilteredArtWorks();
    }

    const applySortBy = (sortBy) => {
        setSelectedSortOption(sortBy);
        setFilterParams({
            ...filterParams,
            sortBy,
        });
        fetchFilteredArtWorks();
    }

    const applyArtistFilter = (artist) => {
        setSelectedArtist(artist);
        setFilterParams({
            ...filterParams,
            artist,
        });
        fetchFilteredArtWorks();
    }

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
        const ans = getAllLike();
        setLikeData(ans);
    },[])
    // console.log(artData)
    const getAllLike = async()=>{
        try{
            const res = await axios.post('/api/getAllLikes', {userId: userID});
            return res.data.getAllLikes;
        }
        catch(err){
            console.error(err);
        }
    }

    const artists = artistData?.data;
    return (
        <main className={'bg-gray-950 text-white py-8 px-4 pt-4 sm:px-16 md:px-24 lg:px-28 sm:py-4 md:py-20'}>
            <Bounce triggerOnce>
                <h1 className={'my-2 flex text-3xl md:text-5xl font-bold'}>Checkout the artworks <FaPaintBrush className={'text-white mx-2'} size={40}/></h1>
            </Bounce>
            <div className={'mx-2 mb-4 p-4 shadow-sm shadow-gray-800 flex flex-col md:flex-row justify-around'}>
                <div className="relative inline-block">
                    <button
                        id="dropdownDelayButton"
                        className="shadow-gray-800 shadow-sm rounded-sm p-2 text-lg w-full md:w-auto"
                        onClick={toggleDropdownCategory}
                    >
                        Category: {selectedCategory || 'All'}
                    </button>
                    {isOpenCategory && (
                        <div
                            id="dropdownDelay"
                            className="absolute z-10 mt-2 animate-slide-down bg-gray-950 divide-y divide-gray-100 rounded-sm shadow-sm shadow-gray-800 w-full md:w-44"
                        >
                            <ul className="" aria-labelledby="dropdownDelayButton">
                                <li className={'cursor-pointer'}>
                                    <div className="block px-4 py-2 hover:bg-gray-900" onClick={() => applyCategoryFilter('Acrylic')}>
                                        Acrylic
                                    </div>
                                </li>
                                <li className={'cursor-pointer'}>
                                    <div className="block px-4 py-2 hover:bg-gray-900" onClick={() => applyCategoryFilter('Oil')}>
                                        Oil
                                    </div>
                                </li>
                                <li className={'cursor-pointer'}>
                                    <div className="block px-4 py-2 hover:bg-gray-900" onClick={() => applyCategoryFilter('Watercolor')}>
                                        Watercolor
                                    </div>
                                </li>
                                <li className={'cursor-pointer'}>
                                    <div className="block px-4 py-2 hover:bg-gray-900" onClick={() => applyCategoryFilter('Pastel')}>
                                        Pastel
                                    </div>
                                </li>
                                <li className={'cursor-pointer'}>
                                    <div className="block px-4 py-2 hover:bg-gray-900" onClick={() => applyCategoryFilter('Encaustic')}>
                                        Encaustic
                                    </div>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="relative inline-block">
                    <button
                        id="dropdownDelayButton"
                        className="shadow-gray-800 shadow-sm rounded-sm p-2 text-lg w-full md:w-auto"
                        onClick={toggleDropdownPrice}
                    >
                        Sort by Price: {selectedSortOption || 'Default'}
                    </button>
                    {isOpenPrice && (
                        <div
                            id="dropdownDelay"
                            className="absolute z-10 mt-2 animate-slide-down bg-gray-950 divide-y divide-gray-100 rounded-sm shadow-sm shadow-gray-800 w-full md:w-44"
                        >
                            <ul className="" aria-labelledby="dropdownDelayButton">
                                <li className={'cursor-pointer'}>
                                    <div className="block px-4 py-2 hover:bg-gray-900" onClick={() => applySortBy('price-high-to-low')}>
                                        High to Low
                                    </div>
                                </li>
                                <li className={'cursor-pointer'}>
                                    <div className="block px-4 py-2 hover:bg-gray-900" onClick={() => applySortBy('price-low-to-high')}>
                                        Low to High
                                    </div>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="relative inline-block">
                    <button
                        id="dropdownDelayButton"
                        className="shadow-gray-800 shadow-sm rounded-sm p-2 text-lg w-full md:w-auto"
                        onClick={toggleDropdownArtist}
                    >
                        Artist: {selectedArtist || 'All'}
                    </button>
                    {isOpenArtist && (
                        <div
                            id="dropdownDelay"
                            className="absolute z-10 mt-2 animate-slide-down bg-gray-950 divide-y divide-gray-100 rounded-sm shadow-sm shadow-gray-800 w-full md:w-44"
                        >
                            <ul className="" aria-labelledby="dropdownDelayButton">
                                {
                                    artists?.map(artist=>(
                                        <li key={artist.id} className={'cursor-pointer'}>
                                            <div className="block px-4 py-2 hover:bg-gray-900" onClick={()=>applyArtistFilter(artist.name)}>
                                                {artist.fullName}
                                            </div>
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
                                <div key={artData1.id}>
                                    <ArtWorkCard
                                        id = {artData1.id}
                                        imageUrl={artData1.imageUrl}
                                        name={artData1.name}
                                        price={artData1.price}
                                        artistName={artData1.artistName}
                                        paintingType={artData1.paintingType}
                                    />
                                </div>
                            ))
                        }
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

            <div className="fixed bottom-4 right-4 z-30">
                <GoToTopButton/>
            </div>
        </main>
    );
};

export default Home;