import React from 'react';

const Feature = ({heading, description}) => {
    return (
        <div className={'h-48 cursor-pointer flex flex-col items-center justify-center relative group sm:my-4 sm:mx-auto w-full lg:w-72 shadow-sm shadow-gray-800 rounded-sm p-8'}>
            <h1 className={'text-2xl'}>
                {heading}
            </h1>
            <div className="h-0.5 my-1 bg-white absolute bottom-4 left-0 right-0 transform duration-500 origin-right scale-x-0 transition-transform group-hover:scale-x-100"></div>
            <p className={'text-md'}>
                {description}
            </p>
        </div>
    );
};

export default Feature;
