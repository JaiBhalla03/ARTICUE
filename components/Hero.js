import React, {useState} from 'react';
import logo from "@/images/logo1.png";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import art1 from '../images/art1.jpg'
import art2 from '../images/art2.jpg'
import art3 from '../images/art3.jpeg'

import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [art1, art2, art3];

    const nextSlide = () => {
        setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
    };

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
    };
    return (
        <div className={'h-screen flex px-28 bg-gray-950'}>
            <div className={'flex flex-col gap-14'}>
                <div className={'pt-20'}>
                    <div className={'flex'}>
                        <h1 className={'text-5xl font-light mt-4 flex'}>
                            Welcome to</h1>
                        <Image className={'mx-4'} src={logo} alt={''} width={230} height={230}/>
                    </div>
                    <h1 className={'text-xl'}>
                        the premier online marketplace for art enthusiasts seeking exceptional and affordable works of art.
                    </h1>
                </div>
                <div>
                    <button className={'text-white p-4 text-xl transition-all duration-500 text-white bg-gray-950 shadow-sm shadow-gray-800 rounded-md hover:scale-110 active:scale-90'}>Get Started!</button>
                </div>
                <ul className={'flex justify-between p-2 shadow-sm shadow-gray-800 rounded-sm'}>
                    <li className={'flex'}>
                        <h1 className={'text-5xl'}>10</h1>
                        <p className={'ml-2 text-gray-500 w-[100px]'}>Our active Artists</p>
                    </li>
                    <li className={'flex'}>
                        <h1 className={'text-5xl'}>20</h1>
                        <p className={'ml-2 text-gray-500 w-[100px]'}>These many Artworks</p>
                    </li>
                    <li className={'flex'}>
                        <h1 className={'text-5xl'}>13</h1>
                        <p className={'ml-2 text-gray-500 w-[100px]'}>Artworks sold</p>
                    </li>
                </ul>
            </div>
            <div className="relative mt-5 shadow-sm shadow-gray-800 ml-5 rounded-md w-full h-full">
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <div className={'w-[80%] h-[80%] overflow-hidden rounded-md'}>
                        <Image
                            src={slides[currentSlide]}
                            alt="Artwork"
                            className="object-cover rounded-md hover:scale-110 duration-500 transition-all"
                        />
                    </div>
                </div>
                <div className="absolute z-10 right-6 top-1/2 transform -translate-y-1/2">
                    <button
                        onClick={prevSlide}
                        className="text-white p-4 text-xl transition-all duration-500 text-white bg-gray-950 shadow-sm shadow-gray-800 rounded-md hover:scale-110 active:scale-90"
                    >
                        <AiOutlineArrowRight/>
                    </button>
                </div>
                <div className="absolute z-10 left-6 top-1/2 transform -translate-y-1/2">
                    <button
                        onClick={nextSlide}
                        className="text-white p-4 text-xl transition-all duration-500 text-white bg-gray-950 shadow-sm shadow-gray-800 rounded-md hover:scale-110 active:scale-90"
                    >
                        <AiOutlineArrowLeft/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;