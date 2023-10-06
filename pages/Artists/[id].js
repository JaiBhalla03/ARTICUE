import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import {AiFillHeart} from "react-icons/ai";
import {FaChevronLeft, FaChevronRight, FaShoppingCart} from "react-icons/fa";
import FeaturedArtistCard from "../../components/FeaturedArtistCard";
import {Fade} from "react-awesome-reveal";

const FeaturedArtistSlider = ({ slides}) => {
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
        <div className="relative py-8 px-6">
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



const Artist = ({artist}) => {
    const data = artist.artist;
    const artworks = data.artworks;
    const slides = artworks.map((artwork)=>(
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
    console.log(data.artworks)

    return (
        <div className="bg-gray-950 text-white py-8 px-4 pt-4 sm:px-16 md:px-24 lg:px-28 sm:py-4 md:py-20">
            <div className="max-w-6xl mx-auto px-4 shadow-gray-800 shadow-sm items-center flex flex-col lg:flex-row">
                <div className={'p-4 m-4 w-full lg:w-1/3 shadow-sm shadow-gray-800 inline-block'}>
                    <div className="overflow-hidden rounded-sm">
                        <Image
                            src={data.userImage}
                            alt="Artwork"
                            width={350}
                            height={350}
                            className="rounded-sm mx-auto hover:scale-110 duration-500 transition-all"
                        />
                    </div>
                </div>
                <div className={'px-4 pt-4 m-4 w-full lg:w-2/3 flex flex-col justify-between'}>
                    <div className={'flex flex-col justify-between'}>
                        <div className={'flex'}>
                            <h1 className={'text-2xl lg:text-4xl'}>{data.fullName}</h1>
                            {/*<p className={'flex text-2xl items-center mx-4'}>*/}
                            {/*    {data.likeCount} <AiFillHeart size={30}/>*/}
                            {/*</p>*/}
                        </div>
                    </div>
                    <div className={'shadow-sm shadow-gray-800 p-2 my-2'}>
                        {data.bio}
                    </div>
                </div>
            </div>
            <div className='my-4 max-w-6xl mx-auto px-4 shadow-gray-800 shadow-sm flex flex-col'>
                <h1 className={'text-2xl lg:text-4xl mx-8 mt-4'}>
                    See the {data.fullName}'s artworks
                </h1>
                <Fade delay={500}>
                    <FeaturedArtistSlider slides={slides}/>
                </Fade>
            </div>
            <Link className={'float-right text-blue-400 underline'} href={'/Artists'}>Go to Artists</Link>
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