async function getWeatherInfo(location) {
    try {
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?locations=${location}&aggregateHours=24&include=hours,current,locationNames&iconSet=icons1&contentType=json&key=KKPQ8XD2D9K6C4SGWUE76Q67L`
        );
        const data = await response.json();
        const fullWeatherData = data.locations[location];
        const currentWeatherData = fullWeatherData.values[0];
        const relevantWeatherData = {
            address: fullWeatherData.address,
            dateTime: currentWeatherData.datetimeStr,
            temperature: currentWeatherData.temp,
            humidity: currentWeatherData.humidity,
            windSpeed: currentWeatherData.wspd,
            conditionIcon: currentWeatherData.icon,
            conditionStatus: currentWeatherData.conditions,
            weeklyData: fullWeatherData.values
                .filter((currentData, index) => index > 0 && index < 8)
                .map((currentData) => ({
                    dateTime: currentData.datetimeStr,
                    temperature: currentData.temp,
                    humidity: currentData.humidity,
                    windSpeed: currentData.wspd,
                })),
        };

        return relevantWeatherData;
    } catch {
        return 'ERROR';
    }
}

export { getWeatherInfo };
