import { useState } from "react";
import { LocationContext } from "../context";

const LocationProvider = ({ children }) => {
  const [selectedLoaction, setSelectedLoaction] = useState({
    latitude: 0,
    longitude: 0,
    location: "",
  });

  return (
    <LocationContext.Provider value={{ selectedLoaction, setSelectedLoaction }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
