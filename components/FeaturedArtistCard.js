import img from '../images/art1.jpg'
import Image from "next/image";
import React from "react";

const FeaturedArtistCard = () => {


    return (
        <>
            <div className="w-80 m-2 overflow-hidden rounded-md">
                <Image
                    src={img}
                    alt="Artwork"
                    className="rounded-md hover:scale-110 duration-500 transition-all"
                />
            </div>
        </>
    );
};

export default FeaturedArtistCard;
