import {configureStore} from '@reduxjs/toolkit';
import navReducer from './slices/navSlice'
import hvReducer from './slices/hvToolsSlice'

export const store = configureStore({
    reducer:{
        nav: navReducer,
        hv: hvReducer
    },
})