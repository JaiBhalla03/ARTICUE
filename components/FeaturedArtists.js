import React from 'react';
import FeaturedArtist from "./FeaturedArtist";
import {FaPaintBrush} from "react-icons/fa";
import {useSpring, animated} from 'react-spring';



const FeaturedArtists = () => {
    const fadeAnimation = useSpring({
        opacity: 1,
        from: {opacity:0},
        config: {duration: 1000},
    });
    return (
        <div className={'py-8 px-4 pt-4 sm:px-16 md:px-24 lg:px-26 sm:py-4 md:py-10 '}>
            <animated.div style={fadeAnimation}>
                <h1 className={'md:mx-4 flex text-3xl md:text-5xl font-bold'}>Featured Artists <FaPaintBrush className={'text-white mx-2'} size={40}/></h1>
            </animated.div>
            <animated.div style={fadeAnimation}>
                <FeaturedArtist name={'Jai Bhalla'}/>
            </animated.div>
            <animated.div style={fadeAnimation}>
                <FeaturedArtist name={'Jai Bhalla'}/>
            </animated.div>
            <animated.div style={fadeAnimation}>
                <FeaturedArtist name={'Jai Bhalla'}/>
            </animated.div>
        </div>
    );
};

export default FeaturedArtists;