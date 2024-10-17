import axios from 'axios';
import { renderWeatherNow } from './render-functions';

const API_KEY = '9859d117ed95573d4fc4b41d3cfef105';
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
