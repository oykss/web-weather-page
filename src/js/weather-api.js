import axios from 'axios';
import { renderWeatherNow } from './render-functions';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// type
// - weather
// - forecast

export const getWeatherStart = async (type, lon, lat, units = 'metric') => {
  const searchParams = new URLSearchParams({
    appid: API_KEY,
    lang: 'en',
    lon,
    lat,
    units,
  });
  try {
    const response = await axios.get(`${BASE_URL}/${type}?${searchParams}`);
    return response.data;
  } catch (error) {}
};

export const getWeather = async (type, value, units = 'metric') => {
  const searchParams = new URLSearchParams({
    appid: API_KEY,
    q: value,
    lang: 'en',
    units,
  });
  try {
    const response = await axios.get(`${BASE_URL}/${type}?${searchParams}`);
    return response.data;
  } catch (error) {}
};
