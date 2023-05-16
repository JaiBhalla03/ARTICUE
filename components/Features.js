import React from 'react';
import Feature from "@/components/Feature";
import {useSpring, animated} from 'react-spring';
import { useViewportScroll, useTransform } from 'framer-motion';

const Features = () => {
    const { scrollY } = useViewportScroll();

    // Define the animation range based on scroll position
    const fadeAnimation = useSpring({
        opacity: useTransform(scrollY, [0, 200], [1, 0]), // Fade out when scrolling 200px down
    });
    return (
        <div className={'px-4 pt-4 sm:px-16 md:px-24 lg:px-28 sm:py-4 md:py-20'}>
            <div className={'flex flex-col sm:flex-col md:flex-row justify-between'}>
                <animated.div style={fadeAnimation}>
                    <Feature heading={'Discover amazing artworks!'} description={'We have more than 5000 artworks made by myriads of artists'}/>
                </animated.div>
                <animated.div style={fadeAnimation}>
                    <Feature heading={'Discover your type!'} description={'We have more than 500 artists working with us. Discover what type artists inspires you.'}/>
                </animated.div>
                <animated.div style={fadeAnimation}>
                    <Feature heading={'Invest in Artworks!'} description={'Buy, track and sell art by only a few clicks only at ARTICUE.'}/>
                </animated.div>
            </div>
        </div>
    );
};

export default Features;