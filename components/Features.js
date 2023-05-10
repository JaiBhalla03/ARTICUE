import React from 'react';
import Feature from "@/components/Feature";

const Features = () => {
    return (
        <div className={'sm:px-16 md:px-24 lg:px-28 sm:py-4 md:py-20'}>
            <div className={'flex sm:flex-col md:flex-row justify-between'}>
                <Feature heading={'Discover amazing artworks!'} description={'We have more than 5000 artworks made by myriads of artists'}/>
                <Feature heading={'Discover your type!'} description={'We have more than 500 artists working with us. Discover what type artists inspires you.'}/>
                <Feature heading={'Invest in Artworks!'} description={'Buy, track and sell art by only a few clicks only at ARTICUE.'}/>
            </div>
        </div>
    );
};

export default Features;