import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../context";

const useWeather = () => {
  const [weatherData, setWeatherData] = useState({
    location: "",
    climate: "",
    temperature: "",
    maxTemperature: "",
    minTemperature: "",
    humidity: "",
    wind: "",
    cloudPercentage: "",
    time: "",
    longitude: "",
    latitude: "",
  });

  const [loading, setLoading] = useState({
    state: false,
    message: "",
  });

  const [error, setError] = useState(null);

  const { selectedLoaction } = useContext(LocationContext);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      setLoading({
        ...loading,
        state: true,
        message: "Fetching weather data...",
      });
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
          import.meta.env.VITE_WEATHER_API
        }&units=metric`
      );
      if (!response.ok) {
        const errorMessage = `Something went wrong: ${response.status}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();

      const updatedWeatherData = {
        ...weatherData,
        location: data?.name,
        climate: data?.weather[0]?.main,
        temperature: data?.main?.temp,
        maxTemperature: data?.main?.temp_max,
        minTemperature: data?.main?.temp_min,
        humidity: data?.main?.humidity,
        wind: data?.wind?.speed,
        cloudPercentage: data?.clouds?.all,
        time: data?.dt,
        longitude: longitude,
        latitude: latitude,
        // longitude: data?.coord?.lon,
        // latitude: data?.coord?.lat,
      };

      setWeatherData(updatedWeatherData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading({
        ...loading,
        state: false,
        message: "",
      });
    }
  };

  useEffect(() => {
    setLoading({
      ...loading,
      state: true,
      message: "Finding your location...",
    });

    if (selectedLoaction.latitude && selectedLoaction.longitude) {
      fetchWeatherData(selectedLoaction.latitude, selectedLoaction.longitude);
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        fetchWeatherData(position.coords.latitude, position.coords.longitude);
      });
    }
  }, [selectedLoaction.latitude, selectedLoaction.longitude]);

  return { weatherData, loading, error };
};

export default useWeather;
