import React from 'react';
import logo from '../images/logo1.png';
import Image from 'next/image';

const Preloader = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-950">
            <div className="w-56">
                <Image src={logo} alt="Website Logo" className="mx-auto" width={800} height={800} />
            </div>
            <div className="h-1 mt-4 w-56 bg-gray-900 rounded">
                <div className="h-full bg-white rounded animate-progress"></div>
            </div>
        </div>
    );
};

export default Preloader;
