import React, {useEffect, useRef, useState} from 'react';
import FeaturedArtistCard from '@/components/FeaturedArtistCard';
import {FaChevronLeft, FaChevronRight, FaPaintBrush} from 'react-icons/fa';
import {Bounce, Fade} from "react-awesome-reveal";
import {useSession} from "next-auth/react";
import axios from "axios";

const FeaturedArtistSlider = ({ slides, name }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideRef = useRef(null);
    const [slideWidth, setSlideWidth] = useState(0);

    const handlePrevClick = () => {
        const index = (currentIndex - 1 + slides.length) % slides.length;
        setCurrentIndex(index);
    };

    const handleNextClick = () => {
        const index = (currentIndex + 1) % slides.length;
        setCurrentIndex(index);
    };

    useEffect(() => {
        if (slideRef.current) {
            setSlideWidth(slideRef.current.offsetWidth / slides.length);
        }
    }, [slideRef.current, slides.length]);

    return (
        <div className="mx-4 sm:mx-16 md:mx-24 relative shadow-gray-800 shadow-sm my-4 py-8 px-6">
            <div className="flex overflow-hidden relative">
                <div
                    className="flex transition-all duration-500"
                    style={{
                        transform: `translateX(-${currentIndex * slideWidth}px)`,
                        width: `${slides.length * 100}%`,
                    }}
                    ref={slideRef}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="w-full flex-shrink-0"
                            style={{ width: `${100 / slides.length}%` }}
                        >
                            {slide}
                        </div>
                    ))}
                </div>
                <button
                    className="text-white absolute top-1/2 -mt-4 ml-4 z-10 left-0 rounded-sm shadow-gray-800 shadow-sm bg-gray-950 w-10 h-10 flex justify-center items-center hover:scale-110 active:scale-90 duration-300"
                    onClick={handlePrevClick}
                >
                    <FaChevronLeft className="text-xl" />
                </button>
                <button
                    className="text-white absolute top-1/2 -mt-4 mr-4 z-10 right-0 rounded-sm shadow-gray-800 shadow-sm bg-gray-950 w-10 h-10 flex justify-center items-center hover:scale-110 active:scale-90 duration-300"
                    onClick={handleNextClick}
                >
                    <FaChevronRight className="text-xl" />
                </button>
            </div>
            <div className="slider-circles absolute -bottom-2 left-1/2 transform -translate-x-1/2 mb-4">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`inline-block w-3 h-3 rounded-full mx-2 cursor-pointer ${
                            index === currentIndex ? 'bg-gray-950 shadow-inner shadow-lg shadow-gray-600 transition-all duration-300' : 'bg-gray-950 shadow-inner shadow-md shadow-gray-800 transition-all duration-300'
                        }`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};
const ForYou = () => {
    const {data, status} = useSession();
    const [forYouArtwork, setForYouArtwork] = useState([]);
    useEffect(()=>{
        const fetchForYouArtwork = async() =>{
            try{
                const res = await axios.get('/api/artworks');

                setForYouArtwork(res.data);
            }
            catch(err){
                return new Error(err);
            }
        }
        fetchForYouArtwork();
    }, [])

    const interestType = data?.user?.interestType;

    console.log(forYouArtwork, interestType);
    // Filter artworks based on interestType
    const filteredArtworks = interestType
        ? forYouArtwork.filter((artwork) => artwork.paintingType === interestType)
        : [];
    console.log(filteredArtworks);

    const slides = filteredArtworks?.map((artwork)=>(
        <FeaturedArtistCard key={artwork.id}
                            id={artwork.id}
                            name={artwork.name}
                            imag={artwork.imageUrl}
                            likeCount={artwork.likeCount}
                            price={artwork.price}
                            discount={artwork.discount}
                            artist={artwork.artistName}
                            paintingType={artwork.paintingType}
        />
    ))


    return (
        <>
            <Bounce triggerOnce>
                <h1 className={'mx-8 md:mx-28 flex text-3xl md:text-5xl font-bold'}>Picks for you <FaPaintBrush className={'text-white mx-2'} size={40}/></h1>
            </Bounce>
            <Fade delay={500}>
                <FeaturedArtistSlider slides={slides}/>
            </Fade>
        </>
    );
};

export default ForYou;
