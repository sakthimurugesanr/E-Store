import { useEffect } from 'react'
import {FaDiaspora, FaHeart,FaRegHeart} from 'react-icons/fa'
import { useSelector,useDispatch } from 'react-redux'
import {addFavorite,removerFavorite,setFavorite} from '../../Redux/features/favoriteSlice'
import {addFavoriteToLocalStorage,removeFavoriteFromLocalStorage,getFavoritesFormLocalStorage} from '../../Utils/localStorage'
const HeartIcon = ({product}) => {
    const dispatch = useDispatch();

    const favorites = useSelector((state) => state.favorites);
    const isFavorite = favorites.some((p)=>p._id === product._id);



    useEffect(()=>{
        const favoritesFromLocalStorage = getFavoritesFormLocalStorage()
        dispatch(setFavorite(favoritesFromLocalStorage))
    }, [])
    const toggleFavorite= ()=>{
        if(isFavorite){
            dispatch(removerFavorite(product))

            //remove the product from Localstorage as well 
            removeFavoriteFromLocalStorage(product._id)
        }
        else{
            dispatch(addFavorite(product))
            // add the product to localstorage as well 
            addFavoriteToLocalStorage(product)
        }

    }

  return (
    <div className='absolute top-2 right-5 cursor-pointer' onClick={toggleFavorite}>
            {isFavorite ? (<FaHeart  className="text-pink-500"/>):(
                <FaRegHeart className="text-white"/>
            )}
    </div>
  )
}

export default HeartIcon