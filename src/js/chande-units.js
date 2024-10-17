import { getLocal } from './local';
import { getWeather, getWeatherStart } from './weather-api';

export function changeUnits(inputValue, valueUnits) {
  const allDataTemp = document.querySelectorAll('[data-temp]');

  if (inputValue) {
    getWeather('weather', inputValue, valueUnits).then(data => {
      const { temp, temp_max, temp_min } = data.main;
      allDataTemp[0].textContent = temp;
      allDataTemp[1].textContent = temp_max;
      allDataTemp[2].textContent = temp_min;
    });

    getWeather('forecast', inputValue, valueUnits).then(data => {
      data.list.forEach((oneDay, index) => {
        const { temp_max, temp_min } = oneDay.main;
        index += 3;
        index % 2 === 0
          ? (allDataTemp[index].textContent = temp_max)
          : (allDataTemp[index].textContent = temp_min);
      });
    });
  } else {
    getLocal().then(location => {
      getWeatherStart('weather', location[0], location[1], valueUnits).then(data => {
        const { temp, temp_max, temp_min } = data.main;
        allDataTemp[0].textContent = temp;
        allDataTemp[1].textContent = temp_max;
        allDataTemp[2].textContent = temp_min;
      });

      getWeatherStart('forecast', location[0], location[1], valueUnits).then(data => {
        data.list.forEach((oneDay, index) => {
          const { temp_max, temp_min } = oneDay.main;
          index += 3;
          index % 2 === 0
            ? (allDataTemp[index].textContent = temp_max)
            : (allDataTemp[index].textContent = temp_min);
        });
      });
    });
  }
}
