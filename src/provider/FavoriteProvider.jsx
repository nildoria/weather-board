import { FavoriteContext } from "../context";
import { useLocalStorage } from "../hooks";

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  const addFavorite = (latitude, longitude, location) => {
    setFavorites([
      ...favorites,
      {
        latitude,
        longitude,
        location,
      },
    ]);
  };
  const removeFavorite = (location) => {
    const restFaforites = favorites.filter(
      (favorite) => favorite.location !== location
    );
    setFavorites(restFaforites);
  };
  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteProvider;
