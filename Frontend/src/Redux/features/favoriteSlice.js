import { createSlice } from "@reduxjs/toolkit";



const favoriteSlice = createSlice({
    name:"favorite",
    initialState:[],
    reducers:{
        addFavorite: (state,action)=>{
            if(!state.some((product)=>product._id === action.payload._id )){
            state.push(action.payload)
        }
    },
        removerFavorite:(state,action)=>{
          return state.filter((product)=>product._id !== action.payload._id )

        },
        setFavorite:(state,action)=>{
            return action.payload
        }
    }
})
 export const {addFavorite,removerFavorite,setFavorite} = favoriteSlice.actions;
 export const  selectFavproduct = (state)=> state.favorite
 export default favoriteSlice.reducer