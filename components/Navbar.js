import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Image from "next/image";
import logo from '../images/logo.png'
import Link from "next/link";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-black text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <a href="/" className="font-bold text-xl">
                            <Image src={logo} alt={''} width={160} height={160}/>
                        </a>
                    </div>
                    <div className="hidden md:block">
                        <ul className="flex space-x-10 text-xl">
                            <li>
                                <a href="/" className="hover:text-gray-300">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/about" className="hover:text-gray-300">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="/services" className="hover:text-gray-300">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="hover:text-gray-300">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <Link href="/Login" className="hover:text-gray-300 underline">
                                    Login/SignUp
                                </Link>
                            </li>
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
                                Home
                            </a>
                        </li>
                        <li className="transform text-center transition-all duration-500 ease-in-out">
                            <a href="/about" className="hover:text-gray-300">
                                About
                            </a>
                        </li>
                        <li className="transform text-center transition-all duration-500 ease-in-out">
                            <a href="/services" className="hover:text-gray-300">
                                Services
                            </a>
                        </li>
                        <li className="transform text-center transition-all duration-500 ease-in-out">
                            <a href="/contact" className="hover:text-gray-300">
                                Contact
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
