"use client";
import { useEffect, useState } from "react";

interface WeatherData {
  name: string;
  weather: { main: string; description: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number };
}
import { Cloud, Sun, CloudRain, Wind, MapPin, Thermometer } from "lucide-react";
import { motion } from "framer-motion";

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

  useEffect(() => {
    const fetchWeather = async (lat?: number, lon?: number) => {
      try {
        const url = lat && lon 
          ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`
          : `https://api.openweathermap.org/data/2.5/weather?q=Matinhos,br&appid=${API_KEY}&units=metric&lang=pt_br`;

        const res = await fetch(url);
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error("Erro ao buscar clima:", err);
      } finally {
        setLoading(false);
      }
    };
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
      () => fetchWeather()
    );
  }, []);

  if (loading) return <div className="p-4 font-mono text-[10px] animate-pulse">SCANNING_ATMOSPHERE...</div>;

  let Icon = Cloud;
  if (weather && weather.weather && weather.weather[0]) {
    if (weather.weather[0].main === "Clear") Icon = Sun;
    else if (weather.weather[0].main === "Rain") Icon = CloudRain;
    else Icon = Cloud;
  }

  return (
    <div className="p-4 font-mono select-none">
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <MapPin size={12} className="text-(--accent-color)" />
          <span className="text-[10px] uppercase tracking-tighter text-white/70">
            {weather?.name || "UNKNOWN_LOC"}
          </span>
        </div>
        <div className="text-[9px] px-2 py-0.5 bg-(--accent-color)/10 text-(--accent-color) border border-(--accent-color)/20 rounded-full">
          LIVE_DATA
        </div>
      </div>

      <div className="flex items-center gap-6">
        <motion.div 
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-(--accent-color)"
        >
          <Icon size={48} strokeWidth={1} />
        </motion.div>

        <div className="flex flex-col">
          <div className="flex items-start">
            <span className="text-4xl font-black tracking-tighter">{weather && weather.main ? Math.round(weather.main.temp) : "--"}</span>
            <span className="text-sm mt-1">°C</span>
          </div>
          <span className="text-[9px] uppercase opacity-50 tracking-[0.2em]">
            {weather && weather.weather && weather.weather[0] ? weather.weather[0].description : "--"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-6">
        <div className="bg-white/5 p-2 border border-white/5 flex flex-col gap-1">
          <div className="flex items-center gap-1 opacity-40">
            <Wind size={10} />
            <span className="text-[8px]">WIND_SPEED</span>
          </div>
          <span className="text-xs">{weather && weather.wind ? weather.wind.speed : "--"} km/h</span>
        </div>
        <div className="bg-white/5 p-2 border border-white/5 flex flex-col gap-1">
          <div className="flex items-center gap-1 opacity-40">
            <Thermometer size={10} />
            <span className="text-[8px]">HUMIDITY</span>
          </div>
          <span className="text-xs">{weather && weather.main ? weather.main.humidity : "--"}%</span>
        </div>
      </div>
    </div>
  );
}