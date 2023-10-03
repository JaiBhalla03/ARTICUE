import React, {useState} from 'react';
import logo from "@/images/logo1.png";
import Image from "next/image";
import art1 from '../images/art1.jpg'
import art2 from '../images/art2.jpg'
import art3 from '../images/art3.jpeg'

import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";
import Link from "next/link";
import {Bounce} from "react-awesome-reveal";

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
        <div className={'smooth-scroll flex flex-col px-4 md:h-[100vh] sm:px-16 md:px-24 md:flex-row lg:px-28 bg-gray-950'}>
            <div className={'flex flex-col gap-5 sm:gap-14'}>
                <div className={'pt-6 sm:pt-20'}>
                    <div className={'flex flex-col sm:flex-row'}>
                        <div className={'pb-2'}>
                            <h1 className={'text-[2.9rem] font-thin sm:mt-5 flex justify-center'}>
                                Welcome to</h1>
                        </div>

                        <Bounce triggerOnce>
                            <Image
                                src={logo}
                                alt=""
                                className="ml-32 mt-1 sm:ml-0 w-48 h-16 sm:w-64 sm:h-24"
                            />
                        </Bounce>
                    </div>
                    <h1 className={'text-lg sm:text-xl'}>
                        the premier online marketplace for art enthusiasts seeking exceptional and affordable works of art.
                    </h1>
                </div>
                <div>
                    <Link href={'#add'} className={'text-white p-4 text-xl transition-all duration-500 text-white bg-gray-950 shadow-sm shadow-gray-800 rounded-sm hover:scale-110 active:scale-90'}>Get Started!</Link>
                </div>
                <ul className={'flex flex-col sm:flex-row justify-between p-2 shadow-sm shadow-gray-800 rounded-sm'}>
                    <li className={'flex justify-around border-b-[1px] border-gray-900 sm:border-none'}>
                        <h1 className={'text-4xl sm:text-5xl'}>10</h1>
                        <p className={'ml-2 text-sm sm:text-md items-center flex flex-col justify-center text-gray-500 w-[100px]'}>Our active Artists</p>
                    </li>
                    <li className={'flex justify-around border-b-[1px] border-gray-900 sm:border-none'}>
                        <h1 className={'text-4xl sm:text-5xl'}>20</h1>
                        <p className={'ml-2 text-sm sm:text-md items-center flex flex-col justify-center text-gray-500 w-[100px]'}>These many Artworks</p>
                    </li>
                    <li className={'flex justify-around border-b-[1px] border-gray-900 sm:border-none'}>
                        <h1 className={'text-4xl sm:text-5xl'}>13</h1>
                        <p className={'ml-2 text-sm sm:text-md items-center flex flex-col justify-center text-gray-500 w-[100px]'}>Artworks sold</p>
                    </li>
                </ul>
            </div>
            <div className="h-[45vh] sm:h-[90vh] relative mt-5 shadow-sm shadow-gray-800 md:ml-5 rounded-sm w-full">
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <div className="w-[80%] h-[40vh] sm:h-[80vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] overflow-hidden rounded-sm">
                        <Image
                            src={slides[currentSlide]}
                            alt="Artwork"
                            className="rounded-sm hover:scale-110 duration-500 transition-all"
                        />
                    </div>
                </div>
                <div className="absolute z-10 right-4 sm:right-6 top-1/2 transform -translate-y-1/2">
                    <button
                        onClick={prevSlide}
                        className="text-white p-2 sm:p-4 text-xl transition-all duration-500 text-white bg-gray-950 shadow-sm shadow-gray-800 rounded-sm hover:scale-110 active:scale-90"
                    >
                        <AiOutlineArrowRight/>
                    </button>
                </div>
                <div className="absolute z-10 left-4 sm:left-6 top-1/2 transform -translate-y-1/2">
                    <button
                        onClick={nextSlide}
                        className="text-white p-2 sm:p-4 text-xl transition-all duration-500 text-white bg-gray-950 shadow-sm shadow-gray-800 rounded-sm hover:scale-110 active:scale-90"
                    >
                        <AiOutlineArrowLeft/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;