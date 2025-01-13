 //Add to product localStorage

 export const addFavoriteToLocalStorage=(product)=>{
        const favorites = getFavoritesFormLocalStorage()
        if(!favorites.some((p)=>p._id === product._id)){
            favorites.push(product) 
            localStorage.setItem('favorites',JSON.stringify(favorites))
        }
 }
 //remove product from localstorage

 export const removeFavoriteFromLocalStorage=(productId)=>{
    const favorites = getFavoritesFormLocalStorage()
    const updateFavorites = favorites.filter((product)=>product._id !== productId )

    localStorage.setItem('favorites',JSON.stringify(updateFavorites));


 }
 //retrive favorites from localstorage
 export const getFavoritesFormLocalStorage =()=>{
    const favoriteJson =  localStorage.getItem('favorites')
    return favoriteJson ? JSON.parse(favoriteJson) :[];

 }