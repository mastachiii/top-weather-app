import './styles/normalize.css';
import './styles/styles.css';
import { getWeatherInfo } from './weather';
import {
    DOM,
    searchButton,
    weeklyWeatherInfoDiv,
    weatherLandingDiv,
} from './dom';

async function init(userSearch) {
    weatherLandingDiv.style.display = 'none';

    let weatherInfo;

    DOM.showErrorAndLoading();

    weatherInfo = await getWeatherInfo(userSearch);

    if (weatherInfo === 'ERROR') {
        DOM.showErrorAndLoading(true);
        return;
    }

    DOM.hideErrorAndLoading();
    DOM.updateMainWeatherInfo(weatherInfo);
    DOM.clearChildrenElement(weeklyWeatherInfoDiv);
    weatherInfo.weeklyData.forEach((data) => DOM.createWeatherWeelky(data));
}

searchButton.addEventListener('click', () => {
    const userSearch = document.querySelector('input');

    init(userSearch.value);

    userSearch.value = '';
});
