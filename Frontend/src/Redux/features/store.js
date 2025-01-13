import {configureStore} from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import authReducer from '../features/auth/authSlice'
import favoritesReducer from './favoriteSlice'
import cartSliceReducer from './cart/cartSlice.js'
import {getFavoritesFormLocalStorage} from '../../Utils/localStorage'
import shopSlice from "../../Redux/features/shop/shopSlice"

  const   initialFavourite = getFavoritesFormLocalStorage()||[]

const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authReducer,
        favorites:favoritesReducer,
        cart:cartSliceReducer,
        shop:shopSlice,

    },
    preloadedState:{favorites:initialFavourite},
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,

})


setupListeners(store.dispatch)
export default store;