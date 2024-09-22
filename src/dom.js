import { format } from 'date-fns';
import clearDay from './assets/icons/weather-status/clear-day.svg';
import clearNight from './assets/icons/weather-status/clear-night.svg';
import cloudy from './assets/icons/weather-status/cloudy.svg';
import fog from './assets/icons/weather-status/fog.svg';
import partlyCloudyDay from './assets/icons/weather-status/partly-cloudy-day.svg';
import partlyCloudyNight from './assets/icons/weather-status/partly-cloudy-night.svg';
import rain from './assets/icons/weather-status/rain.svg';
import snow from './assets/icons/weather-status/snow.svg';
import wind from './assets/icons/weather-status/wind.svg';

const searchButton = document.querySelector('button');
const weatherInfoDiv = document.querySelector('main > div:nth-child(2)');
const weeklyWeatherInfoDiv = document.querySelector(
    '.weekly-weather-div > div:nth-child(3)'
);
const weatherLandingDiv = document.querySelector('.landing');
const weatherErrorDiv = document.querySelector('.error');
const weatherLoadingDiv = document.querySelector('.loading');
const address = document.querySelector('.location-info > h2');
const dateTime = document.querySelector('.location-info > p');
const temperature = document.querySelector('.weather-info > span > p');
const humidity = document.querySelector(
    '.weather-info > span:nth-child(2) > p'
);
const windSpeed = document.querySelector(
    '.weather-info > span:nth-child(3) > p'
);
const conditionIcon = document.querySelector('.weather-status > img');
const conditionStatus = document.querySelector(
    '.weather-status > p:nth-child(2)'
);
const weatherIcons = {
    snow: snow,
    rain: rain,
    fog: fog,
    wind: wind,
    cloudy: cloudy,
    'partly-cloudy-day': partlyCloudyDay,
    'partly-cloudy-night': partlyCloudyNight,
    'clear-day': clearDay,
    'clear-night': clearNight,
};

const DOM = {
    clearChildrenElement(element) {
        [...element.children].forEach((child) => {
            if (child) child.remove();
        });
    },
    updateMainWeatherInfo(weatherInfo) {
        address.textContent = weatherInfo.address;
        dateTime.textContent = format(weatherInfo.dateTime, 'PPPPp');
        temperature.textContent = `${weatherInfo.temperature}°C`;
        humidity.textContent = `${weatherInfo.humidity}%`;
        windSpeed.textContent = `${weatherInfo.windSpeed} km/h`;
        conditionIcon.src = weatherIcons[weatherInfo.conditionIcon];
        conditionStatus.textContent = weatherInfo.conditionStatus;
        weatherInfoDiv.style.display = 'flex';
    },
    createWeatherWeelky(weatherInfo) {
        const weatherWeeklyContainer = document.createElement('div');
        const weatherWeelkyStatsContainer = document.createElement('div');
        const day = document.createElement('p');
        const temperature = document.createElement('p');
        const humidity = document.createElement('p');
        const windSpeed = document.createElement('p');

        day.textContent = format(weatherInfo.dateTime, 'EEEE');
        temperature.textContent = weatherInfo.temperature;
        humidity.textContent = weatherInfo.humidity;
        windSpeed.textContent = weatherInfo.windSpeed;

        weatherWeelkyStatsContainer.append(temperature, humidity, windSpeed);
        weatherWeeklyContainer.append(day, weatherWeelkyStatsContainer);
        weeklyWeatherInfoDiv.append(weatherWeeklyContainer);
    },
    showErrorAndLoading(error = false) {
        weatherInfoDiv.style.display = 'none';
        weatherLoadingDiv.style.display = 'flex';

        if (error) {
            weatherLoadingDiv.style.display = 'none';
            weatherErrorDiv.style.display = 'flex';
        }
    },
    hideErrorAndLoading() {
        weatherErrorDiv.style.display = 'none';
        weatherLoadingDiv.style.display = 'none';
    },
};

export {
    DOM,
    searchButton,
    weeklyWeatherInfoDiv,
    weatherErrorDiv,
    weatherLandingDiv,
};
