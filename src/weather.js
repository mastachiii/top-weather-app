async function getWeatherInfo(location, variable) {
    try {
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?locations=${location}&aggregateHours=24&include=hours,current&iconSet=icons1&contentType=json&key=KKPQ8XD2D9K6C4SGWUE76Q67L`
        );
        const data = await response.json();
        const fullWeatherData = data.locations[location];
        const relevantWeatherData = {
            address: fullWeatherData.address,
            dateTime: fullWeatherData.currentConditions.datetime,
            temp: fullWeatherData.currentConditions.temp,
            // All the data for the current day is provided except for a description of the weather condition,
            // so I had to go into the value array and get it.
            condition: fullWeatherData.values[0].conditions,
            conditionIcon: fullWeatherData.currentConditions.icon,
            weeklyData: fullWeatherData.values
                .filter((currentData, index) => index > 0 && index < 8)
                .map((currentData) => ({
                    dateTime: currentData.datetimeStr,
                    temp: currentData.temp,
                    condition: currentData.conditions,
                    conditionIcon: currentData.icon,
                })),
        };

        return relevantWeatherData;
    } catch {
        return 'ERROR';
    }
}

export { getWeatherInfo };
