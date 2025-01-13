
import { useSelector } from "react-redux"
const FavoritesCount = () => {
    const favorites = useSelector((state) => state.favorites);
    const favoriteLength = favorites.length
  return (
    <div className="absolute top-8 left-2">
        {favoriteLength > 0 &&(
            <span className="px-1 py-0 text-sm bg-pink-700 text-white rounded-full">{favoriteLength}</span>

        )}
        
    </div>
  )
}

export default FavoritesCount