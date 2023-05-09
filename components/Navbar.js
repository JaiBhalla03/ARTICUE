import { useState } from 'react';
import {FaBars, FaSearch, FaShoppingCart, FaTimes, FaUser} from 'react-icons/fa';
import Image from "next/image";
import logo from '../images/logo1.png'
import Link from "next/link";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-950 text-white border-b-[1px] border-b-grey-200">
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
                                <li className={'flex flex-col justify-center'}>
                                    <Link href="/Login" className="hover:text-gray-300 underline">
                                        <FaUser size={20}/>
                                    </Link>
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
