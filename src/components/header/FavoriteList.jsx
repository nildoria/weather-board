import { useContext } from "react";
import { FavoriteContext, LocationContext } from "../../context";

export default function FavoriteList() {
  const { favorites } = useContext(FavoriteContext);
  const { setSelectedLoaction } = useContext(LocationContext);
  return (
    <div className="max-w-xs py-4 bg-white rounded-md border-gray-500 absolute right-0 top-16 text-black shadow-lg ">
      <h3 className="text-lg font-bold px-4">Favourite Locations</h3>
      <ul className="space-y-2 mt-4 *:py-2 *:px-4 *:cursor-pointer">
        {favorites.length > 0 ? (
          favorites.map((favorite) => (
            <li key={favorite.location} className="hover:bg-gray-200">
              <a onClick={() => setSelectedLoaction({ ...favorite })}>
                {favorite.location}
              </a>
            </li>
          ))
        ) : (
          <li className="hover:bg-gray-200">No Favourite Locations</li>
        )}
      </ul>
    </div>
  );
}
