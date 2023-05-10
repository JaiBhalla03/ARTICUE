import React from 'react';
import Feature from "@/components/Feature";

const Features = () => {
    return (
        <div className={'py-20 px-28'}>
            <div className={'flex justify-between'}>
                <Feature heading={'Discover amazing artworks!'} description={'We have more than 5000 artworks made by myriads of artists'}/>
                <Feature heading={'Discover your type!'} description={'We have more than 500 artists working with us. Discover what type artists inspires you.'}/>
                <Feature heading={'Invest in Artworks!'} description={'Buy, track and sell art by only a few clicks only at ARTICUE.'}/>
            </div>
        </div>
    );
};

export default Features;