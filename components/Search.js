import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const Search = () => {
    const showSearchPopup = useSelector((state) => state.showSearchPopup);
    const dispatch = useDispatch();
    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: showSearchPopup ? 'block' : 'none',
    };

    const popupStyle = {
        position: 'absolute',
        top: '20%',
        left: '10%',
        padding: '2rem',
    };
    // const inputStyle = {
    //     backgroundColor: 'gray'
    // }

    useEffect(()=>{
        const handleKeyDown = (event)=>{
            if(event.keyCode === 27 && showSearchPopup){
                dispatch({type: 'TOGGLE_POPUP'});
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return ()=>{
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [showSearchPopup, dispatch])
    return (
        <div style={overlayStyle} className={'z-10'}>
            <div style={popupStyle} className="rounded-lg animate-slide-down absolute top-10 w-[80%] h-[60%] mt-2 w-32 bg-gray-950 shadow-sm shadow-gray-800 rounded-md ">
                <h1 className="text-2xl font-bold mb-4">Search the artworks, artist by name</h1>
                <input type={'text'} placeholder={'Type something!'} className={'bg-gray-950 focus:border-none focus:outline-none p-5 text-xl'}/>
            </div>
        </div>
    );
};

export default Search;
