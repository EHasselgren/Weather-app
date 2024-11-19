import {
  faSun,
  faCloudSun,
  faCloud,
  faSmog,
  faCloudRain,
  faCloudShowersHeavy,
  faBolt,
  faSnowflake,
  faCloudBolt,
} from "@fortawesome/free-solid-svg-icons";

export async function fetchWeatherFromSMHI(lat, lon) {
  // SMHI API URL för 10-dagars prognos
  const url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Hämta den första tidsperioden i prognosen (just nu)
    const forecast = data.timeSeries[0];

    // Extrahera temperatur, vindhastighet och väderförhållande
    let temperature, windSpeed, condition;

    forecast.parameters.forEach((param) => {
      if (param.name === "t") temperature = param.values[0]; // Temperatur i Celsius
      if (param.name === "ws") windSpeed = param.values[0]; // Vindhastighet i m/s
      if (param.name === "Wsymb2") condition = param.values[0]; // Väderförhållande (symbolkod)
    });

    // Returnera datan som ett objekt
    return {
      temperature,
      windSpeed,
      condition,
    };
  } catch (error) {
    console.error("Fel vid hämtning av väderdata från SMHI:", error);
  }
}

// Funktion för att översätta SMHI:s symbolkoder till text
export function interpretCondition(symbolCode) {
  const conditions = {
    1: { text: "Klart", icon: faSun },
    2: { text: "Nästan klart", icon: faSun },
    3: { text: "Halvklart", icon: faCloudSun },
    4: { text: "Molnigt", icon: faCloud },
    5: { text: "Mycket moln", icon: faCloud },
    6: { text: "Mulet", icon: faCloud },
    7: { text: "Dimma", icon: faSmog },
    8: { text: "Lätta regnskurar", icon: faCloudRain },
    9: { text: "Regnskurar", icon: faCloudRain },
    10: { text: "Kraftiga regnskurar", icon: faCloudShowersHeavy },
    11: { text: "Åskskurar", icon: faCloudBolt },
    12: { text: "Lätta snöbyar", icon: faSnowflake },
    13: { text: "Snöbyar", icon: faSnowflake },
    14: { text: "Kraftiga snöbyar", icon: faSnowflake },
    15: { text: "Lätt regn", icon: faCloudRain },
    16: { text: "Regn", icon: faCloudRain },
    17: { text: "Kraftigt regn", icon: faCloudShowersHeavy },
    18: { text: "Åska", icon: faBolt },
    19: { text: "Lätt snöfall", icon: faSnowflake },
    20: { text: "Snöfall", icon: faSnowflake },
    21: { text: "Kraftigt snöfall", icon: faSnowflake },
  };

  return (
    conditions[symbolCode] || { text: "Okänt väderförhållande", icon: faCloud }
  );
}
