import React, {useEffect, useRef, useState} from 'react';
import FeaturedArtistCard from '@/components/FeaturedArtistCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
        <div className="relative shadow-gray-800 shadow-sm m-4 py-8 px-6">
            <h1 className={'text-3xl py-2'}>{name}</h1>
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
const FeaturedArtist = ({name}) => {
    const slides = [
        <FeaturedArtistCard />,
        <FeaturedArtistCard />,
        <FeaturedArtistCard />,
        <FeaturedArtistCard />,
        <FeaturedArtistCard />,
        <FeaturedArtistCard />,
        <FeaturedArtistCard />,
        <FeaturedArtistCard />,
    ];

    return (
            <FeaturedArtistSlider slides={slides} name={name}/>
    );
};

export default FeaturedArtist;
