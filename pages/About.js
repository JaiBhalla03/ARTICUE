import React from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import {Bounce, Fade} from 'react-awesome-reveal';
import Image from 'next/image';
import logo from '../images/logo1.png';
import aboutImage from '../images/aboutImage.png';
import profile from '../images/profile.png';

const About = () => {
    return (
        <div className="px-4 py-8 sm:px-16 md:px-24 lg:px-28">
            <Bounce triggerOnce>
                <h1 className="flex text-3xl md:text-5xl font-bold">
                    About <FaPaintBrush className="text-white mx-2" size={40} />
                </h1>
            </Bounce>
            <Fade delay={250} triggerOnce>
                <div className="flex flex-col md:flex-row">
                    <p className="text-xl mb-8 mt-4 w-[60%] md:w-[100%]">
                        Articue is a platform dedicated to showcasing and promoting artworks from talented artists around the world. We
                        believe that art should be accessible to everyone, and our mission is to connect art enthusiasts with extraordinary
                        pieces that inspire and captivate.
                    </p>
                    <Image className="md:animate-bounce" src={logo} alt="" />
                </div>
            </Fade>
            <Fade delay={500} triggerOnce>
                <div className="flex flex-col md:flex-row">
                    <div className="relative">
                        <Image className="m-4" src={aboutImage} alt="" width={450} />
                    </div>
                    <p className="text-xl mb-4 mt-4 w-[60%]">
                        With over 5000 artworks from a diverse range of artists, Articue offers a curated collection of paintings,
                        sculptures, photographs, and more. Whether you are an art collector, interior designer, or simply someone who
                        appreciates the beauty of art, Articue provides a seamless experience to explore, purchase, and enjoy artworks. At
                        Articue, we are committed to supporting artists and helping them thrive. We collaborate with emerging and
                        established artists, providing them a platform to showcase their talent and reach a global audience. We believe in
                        the power of art to evoke emotions, spark conversations, and shape culture. By connecting artists with art
                        enthusiasts, we aim to create a vibrant and inclusive community that celebrates creativity.
                    </p>
                </div>
            </Fade>
            <Fade delay={750} triggerOnce>
                <div className="flex flex-col justify-between md:flex-row">
                    <p className="my-10 text-xl md:w-[70%]">
                        Our team at Articue consists of a passionate art enthusiast who is dedicated to curating exceptional artworks,
                        ensuring a seamless user experience, and fostering a supportive environment for artists and collectors alike. I
                        believe that art has the ability to enrich our lives, inspire us, and challenge our perspectives. Through Articue,
                        I invite you to embark on a journey of discovery, exploration, and appreciation of art in all its forms.
                    </p>
                    <div className="relative">
                        <Image width={300} className="rounded-full shadow-gray-800 shadow-md" src={profile} alt="" />
                        <div className="absolute rounded-full inset-0 flex items-center justify-center bg-black bg-opacity-90 transition-opacity duration-300 opacity-0 hover:opacity-100">
                            <p className="text-white text-2xl font-bold">Jai Bhalla <br/>[Creator of ARTICUE]</p>
                        </div>
                    </div>
                </div>
            </Fade>
        </div>
    );
};

export default About;