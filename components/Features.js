import React from 'react';
import Feature from "@/components/Feature";
import {Fade} from 'react-reveal'

const Features = () => {
    return (
        <div className={'px-4 pt-4 sm:px-16 md:px-24 lg:px-28 sm:py-4 md:py-20'}>
            <div className={'flex flex-col sm:flex-col md:flex-row justify-between'}>
                <Fade delay={250}>
                    <Feature heading={'Discover amazing artworks!'} description={'We have more than 5000 artworks made by myriads of artists'}/>
                </Fade>
                <Fade delay={500}>
                    <Feature heading={'Discover your type!'} description={'We have more than 500 artists working with us. Discover what type artists inspires you.'}/>
                </Fade>
                <Fade delay={750}>
                    <Feature heading={'Invest in Artworks!'} description={'Buy, track and sell art by only a few clicks only at ARTICUE.'}/>
                </Fade>



            </div>
        </div>
    );
};

export default Features;