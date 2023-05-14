import React from 'react';
import FeaturedArtist from "./FeaturedArtist";
import {FaPaintBrush} from "react-icons/fa";
import {Fade, Zoom, Roll, Bounce} from 'react-reveal';


const FeaturedArtists = () => {
    return (
        <div className={'py-8 px-4 pt-4 sm:px-16 md:px-24 lg:px-26 sm:py-4 md:py-10 '}>
            <Bounce>
                <h1 className={'md:mx-4 flex text-3xl md:text-5xl font-bold'}>Featured Artists <FaPaintBrush className={'text-white mx-2'} size={40}/></h1>
            </Bounce>
            <Fade delay={150}>
                <FeaturedArtist name={'Jai Bhalla'}/>
            </Fade>
            <Fade delay={300}>
                <FeaturedArtist name={'Jai Bhalla'}/>
            </Fade>
            <Fade delay={450}>
                <FeaturedArtist name={'Jai Bhalla'}/>
            </Fade>
        </div>
    );
};

export default FeaturedArtists;