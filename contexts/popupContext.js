import React from 'react';

const PopupContext = React.createContext({
    showSearchPopup: false,
    setShowSearchPopup: ()=>{}
});

export default PopupContext;