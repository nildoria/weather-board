import { useContext, useEffect, useState } from "react";
import { WeatherContext } from "./context";

import Header from "./components/header/Header";
import WeatherBoard from "./components/weatherboard/WeatherBoard";

import ClearSkyImage from "./assets/backgrounds/clear-sky.jpg";
import FewCloudsImage from "./assets/backgrounds/few-clouds.jpg";
import MistImage from "./assets/backgrounds/mist.jpeg";
import RainyDayImage from "./assets/backgrounds/rainy-day.jpg";
import ScatterdCloudsImage from "./assets/backgrounds/scattered-clouds.jpg";
import SnowImage from "./assets/backgrounds/snow.jpg";
import ThunderStormImage from "./assets/backgrounds/thunderstorm.jpg";
import WinterImage from "./assets/backgrounds/winter.jpg";

export default function Page() {
  const [climateImage, setClimateImage] = useState("");

  const { weatherData, loading } = useContext(WeatherContext);

  const { climate } = weatherData;

  const getWeatherBg = (climate) => {
    switch (climate) {
      case "Rain":
        return RainyDayImage;
      case "Clouds":
        return ScatterdCloudsImage;
      case "Clear":
        return ClearSkyImage;
      case "Snow":
        return SnowImage;
      case "Thunder":
        return ThunderStormImage;
      case "Fog":
        return WinterImage;
      case "Haze":
        return MistImage;
      case "Mist":
        return MistImage;
      default:
        return FewCloudsImage;
    }
  };

  useEffect(() => {
    const bgImage = getWeatherBg(climate);
    setClimateImage(bgImage);
  }, [climate]);
  return (
    <>
      {loading.state ? (
        <div className="h-screen grid place-items-center text-2xl text-white">
          {loading.message}
        </div>
      ) : (
        <div
          style={{ backgroundImage: `url(${climateImage})` }}
          className="bg-no-repeat bg-cover h-screen grid place-items-center"
        >
          <Header />
          <WeatherBoard />
        </div>
      )}
    </>
  );
}
