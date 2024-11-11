async function fetchWeatherFromSMHI(lat, lon) {
    // SMHI API URL för 10-dagars prognos
    const url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Hämta den första tidsperioden i prognosen (just nu)
        const forecast = data.timeSeries[0];

        // Extrahera temperatur, vindhastighet och väderförhållande
        let temperature, windSpeed, condition;

        forecast.parameters.forEach(param => {
            if (param.name === "t") temperature = param.values[0]; // Temperatur i Celsius
            if (param.name === "ws") windSpeed = param.values[0];   // Vindhastighet i m/s
            if (param.name === "Wsymb2") condition = param.values[0]; // Väderförhållande (symbolkod)
        });

        // Returnera datan som ett objekt
        return {
            temperature,
            windSpeed,
            condition
        };

    } catch (error) {
        console.error("Fel vid hämtning av väderdata från SMHI:", error);
    }
}

// Funktion för att översätta SMHI:s symbolkoder till text
function interpretCondition(symbolCode) {
    const conditions = {
        1: "Klart",
        2: "Nästan klart",
        3: "Halvklart",
        4: "Molnigt",
        5: "Mycket moln",
        6: "Mulet",
        7: "Dimma",
        8: "Lätta regnskurar",
        9: "Regnskurar",
        10: "Kraftiga regnskurar",
        11: "Åskskurar",
        12: "Lätta snöbyar",
        13: "Snöbyar",
        14: "Kraftiga snöbyar",
        15: "Lätt regn",
        16: "Regn",
        17: "Kraftigt regn",
        18: "Åska",
        19: "Lätt snöfall",
        20: "Snöfall",
        21: "Kraftigt snöfall",
        // fler symbolkoder kan läggas till vid behov
    };
    return conditions[symbolCode] || "Okänt väderförhållande";
}

// Funktion för att hämta användarens plats och hämta väderdata för den platsen
function getUserLocationAndFetchWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Hämta väderdata från SMHI
            const weatherData = await fetchWeatherFromSMHI(lat, lon);

            // Tolka väderförhållanden och skriv ut väderinformationen
            if (weatherData) {
                const conditionText = interpretCondition(weatherData.condition);
                console.log(`Temperatur: ${weatherData.temperature}°C`);
                console.log(`Vindhastighet: ${weatherData.windSpeed} m/s`);
                console.log(`Väderförhållande: ${conditionText}`);
            }
        }, (error) => {
            console.error("Fel vid hämtning av geolokalisering:", error);
        });
    } else {
        console.error("Geolokalisering stöds inte av denna webbläsare.");
    }
}

// Kör funktionen för att hämta väder baserat på användarens plats
getUserLocationAndFetchWeather();
