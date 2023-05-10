import {useEffect, useRef, useState} from 'react';
import {FaBars, FaSearch, FaShoppingCart, FaTimes, FaUser} from 'react-icons/fa';
import Image from "next/image";
import logo from '../images/logo1.png'
import Link from "next/link";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const prevScrollY = useRef(0);
    const [showPopup, setShowPopup] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
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
                                <li>
                                    <a href="/" className="hover:text-gray-300">
                                        Artworks
                                    </a>
                                </li>
                                <li>
                                    <a href="/about" className="hover:text-gray-300">
                                        Artist
                                    </a>
                                </li>
                                <li>
                                    <a href="/services" className="hover:text-gray-300">
                                        About
                                    </a>
                                </li>
                            </ul>
                            <ul className="flex space-x-10 text-xl">
                                <li className={'flex flex-col justify-center'}>
                                    <a className="hover:text-gray-300">
                                        <FaShoppingCart size={20}/>
                                    </a>
                                </li>
                                <li className={'flex flex-col justify-center'}>
                                    <a className="hover:text-gray-300">
                                        <FaSearch size={20}/>
                                    </a>
                                </li>
                                <li className={'relative flex flex-col justify-center'}>
                                    <div className="hover:text-gray-300 underline" onClick={() => setShowPopup(!showPopup)}>
                                        <FaUser size={20}/>
                                    </div>
                                    {showPopup && (
                                        <div className="animate-slide-down absolute top-12 -right-8 mt-2 w-32 bg-gray-950 shadow-sm shadow-gray-800 rounded-md z-10">
                                            <Link href="/Login" className="text-lg block px-3 py-1 text-white hover:bg-gray-900 transition-all duration-300 rounded-t-md hover:text-white">
                                                Login
                                            </Link>
                                            <Link href="#" className="text-lg block px-3 py-1 text-white hover:bg-gray-900 transition-all duration-300 rounded-b-md hover:text-white">
                                                Sign up
                                            </Link>
                                        </div>
                                    )}
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
                <div className="md:hidden text-xl">
                    <ul className="flex flex-col space-y-10 py-4 px-3 absolute top-16 left-0 w-full bg-black">
                        <li className="transform text-center transition-all duration-500 ease-in-out">
                            <a href="/" className="hover:text-gray-300">
                                Artworks
                            </a>
                        </li>
                        <li className="transform text-center transition-all duration-500 ease-in-out">
                            <a href="/about" className="hover:text-gray-300">
                                Artist
                            </a>
                        </li>
                        <li className="transform text-center transition-all duration-500 ease-in-out">
                            <a href="/services" className="hover:text-gray-300">
                                About
                            </a>
                        </li>
                        <li className="transform text-center transition-all duration-500 ease-in-out">
                            <Link href="/Login" className="hover:text-gray-300 underline">
                                Login/SignUp
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
