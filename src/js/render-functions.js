import { change } from './change-fill';

const basePath = import.meta.env.BASE_URL || '';

export const renderWeatherNow = (allParam, wrap) => {
  const { main, weather, coord, wind, name } = allParam;

  wrap.innerHTML = `
    <div class="place-wrap">
      <p class="place">${name} lon:${coord.lon} lat:${coord.lat}</p>
    </div>
    <div class="info">
      <svg class="icon-type">
        <use href="${basePath}icons.svg#${weather[0].icon} "></use>
      </svg>
      
      <ul class="param">
      <li><h1>${weather[0].description}</h1></li>
      
      <li>
        <p class="num">Humidity: ${main.humidity}</p>
      </li>

      <li>
        <p class="num">Wind-speed: ${wind.speed}</p>
        <div class="compass">
          <svg class="icon-compass">
            <use href="${basePath}icons.svg#icon-compass"></use>
          </svg>
        </div>
        </li>
        <li>
          <p class="temp-subtitle">Temperature</p>
          <ul class="temperature">
            <li>
              <p class="num">now: <span data-temp>${main.temp}</span></p>
            </li>
            <li>
              <p class="num">min: <span data-temp>${main.temp_min}</span></p>
            </li>
            <li>
              <p class="num">max: <span data-temp>${main.temp_max}</span></p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  `;

  document.querySelector('.icon-compass').style.transform = `rotate(${wind.deg - 45}deg)`;
};

export const renderWeatherSomeDay = (allParam, wrap) => {
  wrap.innerHTML = '';
  allParam.forEach(oneDay => {
    const { weather, main, dt_txt } = oneDay;

    wrap.innerHTML += `
    <div class="info swiper-slide">
      <svg class="icon-type"  style="fill: ${change()}">
        <use href="${basePath}icons.svg#${weather[0].icon} "></use>
      </svg>
        <ul class="param">
          <li  class="description">
            <p class="num time">${dt_txt.slice(5, 16)}</p>
            <p class="num">${weather[0].description}</p>
          </li>
          
          <li>
            <p class="temp-subtitle">Temperature</p>
            <ul class="temperature">
              <li>
                <p class="num">min: <span data-temp>${main.temp_min}</span></p>
              </li>
              <li>
                <p class="num">max: <span data-temp>${main.temp_max}</span></p>
              </li>
          </ul>
        </li>
      </ul>
    </div>
    `;
  });
};
