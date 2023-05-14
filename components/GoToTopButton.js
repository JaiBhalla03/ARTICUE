import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const GoToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className={'z-30'}>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 bg-gray-950 shadow-gray-800 shadow-sm text-white rounded-sm p-4 hover:animate-scale-in-out duration-500 transform-all"
                >
                    <FaArrowUp size={20}/>
                </button>
            )}
        </div>
    );
};

export default GoToTopButton;
