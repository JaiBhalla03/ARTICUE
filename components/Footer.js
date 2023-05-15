import React, {useState} from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import {Fade} from 'react-reveal';
import Link from "next/link";
import axios from "axios";

const Footer = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name,
            email,
            message,
        };
        try {
            const response = await axios.post('/api/contact', formData);
            if (response.status === 200) {
                setSubmitted(true);
                setName('');
                setEmail('');
                setMessage('');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Fade delay={250} className={'z-0'}>
                <div className="bg-gray-950 text-white py-8 px-4 pt-4 sm:px-16 md:px-24 lg:px-28 sm:py-4 md:py-20">
                    <div className="max-w-6xl mx-auto px-4 shadow-gray-800 shadow-sm">
                        <div className="p-5">
                            <div className={'md:flex md:flex-wrap md:-mx-4 py-6 m-4'}>
                                <div className="md:w-[30%] md:px-4">
                                    <h2 className="uppercase mb-4 font-bold text-xl">About us</h2>
                                    <p className="leading-loose text-sm">
                                        Sure, here's an "About Us" text for Articue:
                                        Articue is a community-driven art platform that showcases and promotes emerging artists from around the world.
                                        Our mission is to democratize the art world by providing a platform for artists to connect with art enthusiasts,
                                        collectors, and buyers. We believe that art has the power to enrich lives, evoke emotions, and create meaningful
                                        conversations. By fostering a vibrant community of artists and art lovers, we aim to make art accessible and affordable
                                        for everyone.
                                    </p>
                                </div>
                                <div className="md:w-[20%] md:px-4">
                                    <h2 className="uppercase mb-4 font-bold text-xl">Quick links</h2>
                                    <ul className="leading-loose">
                                        <li><Link href="/" className={'underline'}>Home</Link></li>
                                        <li><Link href="#" className={'underline'}>Artist</Link></li>
                                        <li><Link href="#" className={'underline'}>Artworks</Link></li>
                                    </ul>
                                </div>
                                <div className="md:w-[20%] md:px-4">
                                    <h2 className="uppercase mb-4 font-bold text-xl">Follow us</h2>
                                    <div className="flex">
                                        <a href="#" className="mr-6 hover:text-gray-300 transition-all duration-500"><FaFacebook size={24} /></a>
                                        <a href="#" className="mr-6 hover:text-gray-300 transition-all duration-500"><FaTwitter size={24} /></a>
                                        <a href="#" className="mr-6 hover:text-gray-300 transition-all duration-500"><FaInstagram size={24} /></a>
                                    </div>
                                </div>
                                <div className="md:w-[30%] md:px-4">
                                    <h2 className="uppercase mb-4 font-bold text-xl">Contact us</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <input
                                                className="focus:border-none focus:outline-none p-2 bg-gray-950 shadow-gray-800 shadow-sm w-full rounded"
                                                type="text"
                                                placeholder="Name"
                                                value={name}
                                                onChange={(e)=>setName(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <input
                                                className="focus:border-none focus:outline-none p-2 bg-gray-950 shadow-gray-800 shadow-sm w-full rounded"
                                                type="text"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e)=>setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <textarea
                                                className="focus:border-none focus:outline-none p-2 bg-gray-950 resize-none shadow-gray-800 shadow-sm w-full rounded"
                                                rows={5}
                                                placeholder="Message"
                                                value={message}
                                                onChange={(e)=>setMessage(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="flex justify-center">
                                            <button
                                                className="text-white px-4 py-2 text-xl transition-all duration-500 text-white bg-gray-950 shadow-sm shadow-gray-800 rounded-md hover:scale-110 active:scale-90"
                                                type={'submit'}
                                            >
                                                Send
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>
            <div>
                <p className="text-center text-base leading-6 text-gray-400">
                    &copy; 2023 Articue, Inc. All rights reserved.
                </p>
            </div>
            {submitted && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-gray-950 rounded-lg py-6 px-12 shadow-sm shadow-gray-800">
                        <h2 className="text-xl font-bold mb-4">Form Submitted Successfully</h2>
                        <p>Your message has been submitted. Thank you!😊</p>
                        <div className={'flex justify-end'}>
                            <button
                                className="text-white p-2 mt-2 text-lg transition-all duration-500 text-white bg-gray-950 shadow-sm shadow-gray-800 rounded-sm hover:scale-110 active:scale-90"
                                onClick={() => setSubmitted(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Footer;
