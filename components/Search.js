import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const Search = () => {
    const showSearchPopup = useSelector((state) => state.showSearchPopup);
    const dispatch = useDispatch();
    const overlayRef = useRef(null);
    const popupRef = useRef(null);
    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: showSearchPopup ? 'block' : 'none',
    };

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
    }, [showSearchPopup, dispatch]);
    useEffect(() => {
        const handleClick = (event) => {
            if (
                showSearchPopup &&
                overlayRef.current &&
                popupRef.current &&
                !overlayRef.current.contains(event.target) &&
                !popupRef.current.contains(event.target)
            ) {
                dispatch({ type: 'TOGGLE_POPUP' });
            }
        };
        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [showSearchPopup, dispatch]);
    return (
        <div style={overlayStyle} className={'z-10'}>
            <div className="absolute top-[10%] left-[10%] md:top-[20%] p-[1rem] md:p-[2rem] rounded-sm animate-slide-down absolute top-10 w-[80%] h-[60%] mt-2 w-32 bg-gray-950 shadow-sm shadow-gray-800 rounded-md ">
                <textarea type={'text'} placeholder={'Search artists, artworks by there name!'} className={'resize-none p-1 text-md w-full bg-gray-950 focus:border-none focus:outline-none md:p-5 md:text-xl'}/>
            </div>
        </div>
    );
};

export default Search;
