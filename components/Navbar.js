import React, {useEffect, useRef, useState} from 'react';
import {FaBars, FaSearch, FaShoppingCart, FaTimes, FaUser} from 'react-icons/fa';
import Image from "next/image";
import logo from '../images/logo1.png'
import Link from "next/link";
import {useDispatch} from "react-redux";
import {togglePopup} from "@/redux/actions";
import {signIn, signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";

export default function Navbar(){
    const router = useRouter();
    const {data ,status} = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const prevScrollY = useRef(0);
    const [showPopup, setShowPopup] = useState(false);
    const [isOpenDetails, setIsOpenDetails] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const dispatch = useDispatch();
    const handleClick = ()=>{
        dispatch(togglePopup());
    }
    const handleClick_1 = ()=>{
        dispatch(togglePopup());
        toggleMenu();
    }
    const handleSignIn = async () => {
        await signIn();
        await router.push('/details');
    };
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > prevScrollY.current) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
            prevScrollY.current = currentScrollY;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    useEffect(()=>{
        const handleKeyDown = (event)=>{
            if(event.keyCode === 27 && showPopup){
                setShowPopup(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return ()=>{
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [showPopup]);

    const toggleDropdownDetails = () => {
        setIsOpenDetails(!isOpenDetails);
    };


    return (
        <nav className={`z-20 bg-gray-950 text-white border-b-[1px] border-b-grey-200 transition-all duration-700 transition-all ${
            isScrolled ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100 sticky top-0"
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <a href="/" className="font-bold text-xl">
                            <Image src={logo} alt={''} width={150} height={150}/>
                        </a>
                    </div>
                    <div className="hidden md:block w-full">
                        <ul className="flex justify-between space-x-10 text-xl">
                            <ul className="mx-14 flex space-x-10 text-xl">
                                <li className={'flex items-center'}>
                                    <Link href="/Artworks" className="hover:text-gray-300">
                                        Artworks
                                    </Link>
                                </li>
                                <li className={'flex items-center'}>
                                    <Link href="/Artists" className="hover:text-gray-300">
                                        Artists
                                    </Link>
                                </li>
                                <li className={'flex items-center'}>
                                    <Link href="/About" className="hover:text-gray-300">
                                        About
                                    </Link>
                                </li>
                            </ul>
                            <ul className="flex space-x-10 text-xl">
                                <li className={'flex flex-col justify-center'}>
                                    <Link href={'/cart'} className="hover:text-gray-300">
                                        {
                                            data?.user?.role === 'Seller' ? (<>
                                            </>) : (
                                                <FaShoppingCart size={20}/>
                                            )
                                        }
                                    </Link>
                                </li>
                                <li className={'flex flex-col justify-center'}>
                                    <a className="hover:text-gray-300">
                                        <FaSearch size={20} onClick={handleClick}/>
                                    </a>
                                </li>
                                <li className={'relative flex flex-col justify-center items-center'}>
                                    <div className="hover:text-gray-300 underline flex items-center" onClick={() => setShowPopup(!showPopup)}>
                                        {data ?
                                            <button onClick={toggleDropdownDetails} className={'p-1 transform transition-all duration-500 rounded-sm shadow-gray-800 shadow-sm'}>
                                                <div>
                                                    <Image className={'rounded-sm cursor-pointer'} src={data?.user?.image} alt={''} width={35} height={35}/>
                                                    {isOpenDetails && (
                                                        <div
                                                            id="dropdownDelay"
                                                            className="absolute right-0 z-10 mt-4 animate-slide-down bg-gray-950 divide-y divide-gray-100 rounded-sm shadow-sm shadow-gray-800 w-44"
                                                        >
                                                            <ul className="my-2" aria-labelledby="dropdownDelayButton">
                                                                <li className={'text-lg'}>
                                                                    <Link href="/dashboard" className="block px-3 py-1 hover:bg-gray-900">
                                                                        Dashboard
                                                                    </Link>
                                                                </li>
                                                                <li className={'text-lg'}>
                                                                    <Link href="/details" className="block px-3 py-1 hover:bg-gray-900">
                                                                        Update details
                                                                    </Link>
                                                                </li>
                                                                <li className={'border-t-[1px] flex justify-center border-gray-800 text-lg hover:bg-gray-900'}>
                                                                    <button onClick={()=>signOut()} className="block px-3 py-1">
                                                                        LogOut
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>

                                            </button>: <button onClick={()=>signIn( ['github','google'] ,  {callbackUrl:'http://localhost:3000/details'})}><FaUser size={20}/></button>}
                                    </div>
                                </li>
                            </ul>
                        </ul>
                    </div>
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="text-gray-400 hover:text-white focus:outline-none"
                            onClick={toggleMenu}
                        >
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden text-xl h-screen flex w-full items-center">
                    <ul className="flex flex-col space-y-10 py-4 px-3 absolute top-1/2 -translate-y-1/2 left-0 w-full bg-gray-950">
                        <div onClick={toggleMenu} className="cursor-pointer text-center">
                            <Link href="/Artworks" className="hover:text-gray-300">
                                Artworks
                            </Link>
                        </div>
                        <div onClick={toggleMenu} className="cursor-pointer text-center">
                            <Link href="/Artists" className="hover:text-gray-300">
                                Artist
                            </Link>
                        </div>
                        <div onClick={toggleMenu} className="cursor-pointer text-center">
                            <Link href="/About" className="hover:text-gray-300">
                                About
                            </Link>
                        </div>
                        <div onClick={toggleMenu} className={''}>
                            <a className="flex justify-center items-center hover:text-gray-300">
                                <div className={'flex'}>
                                    See your cart <FaShoppingCart className={'ml-2'} size={24}/>
                                </div>
                            </a>
                        </div>
                        <div onClick={toggleMenu} className={''}>
                            <a className="flex justify-center items-center hover:text-gray-300">
                                <div className={'flex'}>
                                    Search by keywords <FaSearch className={'ml-2'} size={24} onClick={handleClick_1}/>
                                </div>
                            </a>
                        </div>
                        <div className={'relative flex flex-col justify-center items-center'}>
                            <div className="hover:text-gray-300 underline flex items-center" onClick={() => setShowPopup(!showPopup)}>
                                {data ?
                                    <button onClick={toggleDropdownDetails} className={'p-1 hover:scale-105 active:scale-95 transform transition-all duration-500 rounded-sm shadow-gray-800 shadow-sm'}>
                                        <div>
                                            <Image className={'rounded-sm cursor-pointer'} src={data.user.image} alt={''} width={35} height={35}/>
                                        </div>
                                    </button>: <button onClick={()=>signIn('github', {callbackUrl:'http://localhost:3000/details'})}><FaUser size={20}/></button>}
                            </div>
                        </div>
                    </ul>
                </div>
            )}
        </nav>
    );
};

