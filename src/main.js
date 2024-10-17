import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getWeather, getWeatherStart } from './js/weather-api';
import { renderWeatherNow, renderWeatherSomeDay } from './js/render-functions';
import { pulsation } from './js/change-fill';
import { getLocal } from './js/local';
import { changeUnits } from './js/chande-units';

const wrapNow = document.querySelector('#now');
const wrapSome = document.querySelector('#some');
const form = document.querySelector('form');
const checkboxUnits = document.querySelector('.units');
const checkboxTheme = document.querySelector('.theme');

let intervalNew,
  inputValue,
  valueUnits = 'metric';

const swiper = new Swiper('.swiper-container', {
  direction: 'vertical',
  slidesPerView: 5,
  spaceBetween: 20,
  mousewheel: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

getLocal().then(location => {
  getWeatherStart('weather', location[0], location[1]).then(data => {
    renderWeatherNow(data, wrapNow);
    intervalNew = setInterval(pulsation, 8000);
  });

  getWeatherStart('forecast', location[0], location[1])
    .then(data => {
      renderWeatherSomeDay(data.list, wrapSome);
    })
    .finally(() => {
      swiper.update();
    });
});

form.addEventListener('submit', event => {
  event.preventDefault();

  inputValue = document.querySelector('input').value.trim();

  if (inputValue === '') {
    return;
  }
  Promise.all([
    getWeather('weather', inputValue, valueUnits).then(data => {
      renderWeatherNow(data, wrapNow);
      clearInterval(intervalNew);
      intervalNew = setInterval(pulsation, 8000);
    }),
    getWeather('forecast', inputValue, valueUnits).then(data => {
      renderWeatherSomeDay(data.list, wrapSome);
    }),
  ])
    .catch(() => {
      inputValue = null;
      iziToast.error({
        message: 'Sorry, no city was found with that name. Please try again!',
        position: 'topRight',
        backgroundColor: '#ef4040',
      });
    })
    .finally(() => {
      swiper.update();
    });
});

checkboxUnits.addEventListener('change', event => {
  event.target.checked ? (valueUnits = 'imperial') : (valueUnits = 'metric');
  changeUnits(inputValue, valueUnits);
});

const linkDarkMod = document.querySelector('[title="style-dark"]');

checkboxTheme.addEventListener('change', event => {
  if (event.target.checked) {
    linkDarkMod.removeAttribute('disabled');
  } else {
    linkDarkMod.setAttribute('disabled', 'true');
  }
});
