import { getWeatherInfo } from './weather';

async function init() {
    let weatherInfo;

    weatherInfo = await getWeatherInfo('-');
}

init();
