import { useContext, useEffect, useState } from "react";
import HeartFillIcon from "../../assets/heart-red.svg";
import HeartIcon from "../../assets/heart.svg";
import { FavoriteContext, WeatherContext } from "../../context";

export default function FavoriteToggle() {
  const [isFavorite, setIsFavorite] = useState(false);

  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoriteContext);

  const { weatherData } = useContext(WeatherContext);

  const { latitude, longitude, location } = weatherData;

  useEffect(() => {
    const found = favorites.find((favorite) => favorite.location === location);
    if (found) {
      setIsFavorite(found);
    }
  }, []);

  const handleFavorite = () => {
    const found = favorites.find((favorite) => favorite.location === location);

    if (!found) {
      addFavorite(latitude, longitude, location);
    } else {
      removeFavorite(location);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="md:col-span-2">
      <div className="flex items-center justify-end space-x-6">
        <button
          onClick={handleFavorite}
          className="text-sm md:text-base inline-flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#C5C5C54D]"
        >
          <span>Add to Favourite</span>
          <img src={isFavorite ? HeartFillIcon : HeartIcon} alt="" />
        </button>
      </div>
    </div>
  );
}
