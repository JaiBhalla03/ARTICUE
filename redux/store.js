import {createStore} from 'redux';

const initialState =  {
    showSearchPopup: false,
}

const reducer = (state = initialState, action)=>{
    switch(action.type) {
        case 'TOGGLE_POPUP':
            return {
                ...state,
                showSearchPopup: !state.showSearchPopup
            };
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;