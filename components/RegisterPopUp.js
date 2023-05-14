import React, { useState, useEffect } from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import { BiGhost } from 'react-icons/bi';
import poster from '../images/registerPoster1.png';
import Image from 'next/image';
import {AiOutlineClose} from "react-icons/ai";

const RegisterPopup = ({ handleClose }) => {
    // Define the state variable to track the visibility of the popup
    const [showPopup, setShowPopup] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [artworks, setArtworks] = useState(null);

    // Define a function to close the popup
    const closePopup = () => {
        setShowPopup(false);
        handleClose();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Save the artist's data and artwork using an API call
        // Then close the popup
        closePopup();
    };


    // Define a function to handle the "Escape" key press
    const handleEscapeKeyPress = (event) => {
        if (event.key === 'Escape') {
            closePopup();
        }
    };

    // Add an event listener to handle the "Escape" key press
    useEffect(() => {
        document.addEventListener('keydown', handleEscapeKeyPress);
        return () => {
            document.removeEventListener('keydown', handleEscapeKeyPress);
        };
    }, []);

    return (
        <div
            className={`z-40 fixed top-0 left-0 w-full h-full flex justify-center items-center ${
                showPopup ? '' : 'hidden'
            }`}
        >
            <button className="absolute z-50 top-[2%] right-[1%] text-white p-2 text-xl transition-all duration-500 text-white bg-gray-950 shadow-sm shadow-gray-800 rounded-sm hover:scale-110 active:scale-90" onClick={closePopup}>
                <AiOutlineClose/>
            </button>
                <div className="absolute top-[10%] left-[10%] md:top-[5%] p-[1rem] md:p-[2rem] rounded-sm animate-slide-down absolute top-10 w-[80%] h-[90%] mt-2 w-32 bg-gray-950 shadow-sm shadow-gray-800 rounded-md ">
                    <div className={'flex flex-col h-full'}>
                        <h1 className="flex text-3xl font-bold mb-4">
                            Join now! <BiGhost className={'mx-2'} size={35} />
                        </h1>
                        <div className={'flex justify-between'}>
                            {/*<Image src={poster} alt={''} width={600}/>*/}
                            <form className={'flex flex-col w-full p-4'} onSubmit={handleSubmit}>
                                <input
                                    className=" bg-gray-950 border-none focus:outline-none focus:border-none shadow-gray-800 shadow-sm rounded-sm my-2 p-2 w-full"
                                    id="name"
                                    type="text"
                                    placeholder="Enter your full name"
                                />
                                <input
                                    className=" bg-gray-950 border-none focus:outline-none focus:border-none shadow-gray-800 shadow-sm rounded-sm my-2 p-2 w-full"
                                    id="username"
                                    type="text"
                                    placeholder="Create a username"
                                />
                                <input
                                    className=" bg-gray-950 border-none focus:outline-none focus:border-none shadow-gray-800 shadow-sm rounded-sm my-2 p-2 w-full"
                                    id="password"
                                    type="password"
                                    placeholder="Create a password"
                                />
                                <input
                                    className=" bg-gray-950 border-none focus:outline-none focus:border-none shadow-gray-800 shadow-sm rounded-sm my-2 p-2 w-full"
                                    id="cpassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                />
                                <div class="relative">
                                    <select
                                        id={'type'}
                                        className="bg-gray-950 border-none focus:outline-none focus:border-none shadow-gray-800 shadow-sm rounded-sm my-2 p-2 w-full"
                                    >
                                        <option value="" disabled selected>Select your painting type</option>
                                        <option>Oil Painters</option>
                                        <option>Watercolor Painters</option>
                                        <option>Acrylic Painters</option>
                                        <option>Pastel Painters</option>
                                        <option>Encaustic Painters</option>
                                    </select>
                                    <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                            <path fill-rule="evenodd"
                                                  d="M16.293 5.293a1 1 0 00-1.414-1.414l-4 4a1 1 0 000 1.414l4 4a1 1 0 001.414-1.414L12.414 10l3.879-3.879z"
                                                  clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                </div>
                                <textarea className={'resize-none bg-gray-950 border-none focus:outline-none focus:border-none shadow-gray-800 shadow-sm rounded-sm my-2 p-2 w-full'} placeholder={'Who are you?'}></textarea>
                                <div className="mt-4 flex items-center justify-center">
                                    <button
                                        className="text-white p-2 text-xl transition-all duration-500 text-white bg-gray-950 shadow-sm shadow-gray-800 rounded-sm hover:scale-110 active:scale-90"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default RegisterPopup;