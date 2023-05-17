import React from 'react';
import ArtistsCard from "../components/ArtistsCard";
import {FaPaintBrush} from "react-icons/fa";
import {Bounce} from "react-awesome-reveal";

const Artists = () => {
    return (
        <main className={'bg-gray-950 text-white py-8 px-4 pt-4 sm:px-16 md:px-24 lg:px-28 sm:py-4 md:py-20'}>
            <Bounce triggerOnce>
                <h1 className={'my-2 flex text-3xl md:text-5xl font-bold'}>Checkout our artists <FaPaintBrush className={'text-white mx-2'} size={40}/></h1>
            </Bounce>
            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
                <ArtistsCard/>
                <ArtistsCard/>
                <ArtistsCard/>
                <ArtistsCard/>
                <ArtistsCard/>
                <ArtistsCard/>
                <ArtistsCard/>
                <ArtistsCard/>
                <ArtistsCard/>
                <ArtistsCard/>
                <ArtistsCard/>
                <ArtistsCard/>
            </div>
        </main>
    );
};

export default Artists;