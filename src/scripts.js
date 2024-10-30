import "./styles.css";
import { DOMgen } from "./DOMgenerator.js";
import clearDay from "./images/clear-day.svg";
import clearNight from "./images/clear-night.svg";
import cloudy from "./images/cloudy.svg";
import fog from "./images/fog.svg";
import hail from "./images/hail.svg";
import partlyCloudyDay from "./images/partly-cloudy-day.svg";
import partlyCloudyNight from "./images/partly-cloudy-night.svg";
import rain from "./images/rain.svg";
import rainSnow from "./images/rain-snow.svg";
import rainSnowShowersDay from "./images/rain-snow-showers-day.svg";
import rainSnowShowersNight from "./images/rain-snow-showers-night.svg";
import showersDay from "./images/showers-day.svg";
import showersNight from "./images/showers-night.svg";
import sleet from "./images/sleet.svg";
import snow from "./images/snow.svg";
import snowShowersDay from "./images/snow-showers-day.svg";
import snowShowersNight from "./images/snow-showers-night.svg";
import thunder from "./images/thunder.svg";
import thunderRain from "./images/thunder-rain.svg";
import thunderShowersDay from "./images/thunder-showers-day.svg";
import thunderShowersNight from "./images/thunder-showers-night.svg";
import wind from "./images/wind.svg";

// link using latitude and longitude
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/38.9697,-77.385?key=YOUR_API_KEY
// {mode: 'cors'}

function DataGrabber() {
  let allWeatherData;

  let parent = document.querySelectorAll(`[data-row]`);
  let buttonParent = document.querySelector(".day-button__container");

  const weatherData = async function (input) {
    let temp = document.querySelector('input[name="toggle"]:checked').value;
    // add the temp to the API fetching link
    let results = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?unitGroup=metric&key=57279EDE8NTFP5ZE9WC6AJK6X&contentType=json&lang=it`
    );
    let weatherData = await results.json();
    allWeatherData = weatherData;
    console.log(weatherData);
    return weatherData;
  };

  const getWeatherData = () => {
    return allWeatherData;
  };

  const asyncTimeHours = async (day) => {
    // let length = allWeatherData.days[0].hours.length;
    for (let i = 0; i < 24; i++) {
      let date = allWeatherData.days[day].hours[i].datetime;

      // console.log(date)
      parent[i].children[0].textContent = date;
    }
  };
  const iconInterpreter = (icon) => {
    switch (icon) {
      case "snow":
        return snow;

        break;
      case "snow-showers-day":
        return snowShowersDay;

        break;
      case "snow-showers-night":
        return snowShowersNight;

        break;
      case "thunder-rain":
        return thunderRain;

        break;
      case "thunder-showers-day":
        return thunderShowersDay;

        break;
      case "thunder-showers-night":
        return thunderShowersNight;

        break;
      case "rain":
        return rain;

        break;
      case "showers-day":
        return showersDay;

        break;
      case "showers-night":
        return showersNight;

        break;
      case "fog":
        return fog;

        break;
      case "wind":
        return wind;

        break;
      case "cloudy":
        return cloudy;

        break;
      case "partly-cloudy-day":
        return partlyCloudyDay;

        break;
      case "partly-cloudy-night":
        return partlyCloudyNight;

        break;
      case "clear-day":
        return clearDay;

        break;
      case "clear-night":
        return clearNight;

        break;
    }
  };
  const asyncIconHours = async (day) => {
    for (let i = 0; i < 24; i++) {
      let icon = allWeatherData.days[day].hours[i].icon;
      let image = DOMgen.makeImage();
      parent[i].children[1].replaceChildren();
      image.src = iconInterpreter(icon);
      parent[i].children[1].appendChild(image);

      // console.log(icon)
      // parent[i].children[1].textContent = icon;
    }
  };

  const asyncTempHours = async (day) => {
    for (let i = 0; i < 24; i++) {
      let temp = allWeatherData.days[day].hours[i].temp;

      // console.log(temp)
      parent[i].children[2].textContent = tempChecker(temp);
    }
  };

  const asyncRainHours = async (day) => {
    for (let i = 0; i < 24; i++) {
      let rain = allWeatherData.days[day].hours[i].precip;

      // console.log(temp)
      parent[i].children[3].textContent = rain + " mm";
    }
  };

  const asyncWindHours = async (day) => {
    for (let i = 0; i < 24; i++) {
      let windSpeed = allWeatherData.days[day].hours[i].windspeed;
      //   console.log(windSpeed);
      let windDir = allWeatherData.days[day].hours[i].winddir;
      //   console.log(windDir);

      // console.log(temp)
      parent[
        i
      ].children[4].textContent = `Velocita : ${windSpeed}km/h  Direzione : ${windDirChecker(
        windDir
      )}`; // to change into something
    }
  };

  const windDirChecker = (input) => {
    if ((input >= 341 && input <= 360) || input <= 19) {
      return "N";
    } else if (input >= 20 && input <= 30) {
      return "N/NE";
    } else if (input >= 31 && input <= 50) {
      return "NE";
    } else if (input >= 51 && input <= 70) {
      return "E/NE";
    } else if (input >= 71 && input <= 100) {
      return "E";
    } else if (input >= 101 && input <= 120) {
      return "E/SE";
    } else if (input >= 121 && input <= 140) {
      return "SE";
    } else if (input >= 141 && input <= 160) {
      return "SE/E";
    } else if (input >= 161 && input <= 190) {
      return "S";
    } else if (input >= 191 && input <= 210) {
      return "S/SW";
    } else if (input >= 211 && input <= 230) {
      return "SW";
    } else if (input >= 231 && input <= 250) {
      return "W/SW";
    } else if (input >= 251 && input <= 280) {
      return "W";
    } else if (input >= 281 && input <= 300) {
      return "W/NW";
    } else if (input >= 301 && input <= 320) {
      return "NW";
    } else if (input >= 321 && input <= 340) {
      return "N/NW";
    }
  };

  const tempChecker = (number) => {
    let radio = document.querySelector('input[name="toggle"]:checked').value;
    if (radio === "celcius") {
      return number + "c";
    } else if (radio === "fahrenheit") {
      return Math.ceil((number * 9) / 5 + 32) + "f";
    }
  };

  const asyncTempFeelHours = async (day) => {
    for (let i = 0; i < 24; i++) {
      let tempFeel = allWeatherData.days[day].hours[i].feelslike;

      // console.log(temp)
      parent[i].children[5].textContent = tempChecker(tempFeel);
    }
  };

  const asyncUVHours = async (day) => {
    for (let i = 0; i < 24; i++) {
      let UV = allWeatherData.days[day].hours[i].uvindex;

      // console.log(temp)
      parent[i].children[6].textContent = UV;
    }
  };

  const asyncPressureHours = async (day) => {
    for (let i = 0; i < 24; i++) {
      let pressure = allWeatherData.days[day].hours[i].pressure;

      // console.log(temp)
      parent[i].children[7].textContent = pressure;
    }
  };

  const asyncDatesDays = async (day) => {
    buttonParent.replaceChildren(); //can this be done differently?
    for (let i = 0; i < 7; i++) {
      let input = document.querySelector("#search").value;
      let p = DOMgen.makePara()
      let date = allWeatherData.days[i].datetime;
      let button = DOMgen.makeButton("", "day-button");
      let image = DOMgen.makeImage();
      image.src = iconInterpreter(allWeatherData.days[i].icon)
     
      
      p.textContent = date;
      button.appendChild(image)
      button.appendChild(p)
      buttonParent.appendChild(button);

      button.addEventListener("click", () => {
        returnData(i);
      });
      // buttonParent.children[i].textContent = date
    }
  };
  const returnData = async (day) => {
    await asyncTimeHours(day);
    await asyncTempHours(day);
    await asyncIconHours(day);
    await asyncRainHours(day);
    await asyncWindHours(day);
    await asyncTempFeelHours(day);
    await asyncUVHours(day);
    await asyncPressureHours(day);
    await asyncDatesDays();
  };

  const returnEverything = async (day, input) => {
    await weatherData(input);

    await returnData(day);
  };
  return { returnData, returnEverything, getWeatherData, asyncDatesDays };
}

function ButtonPlacer() {
  const weatherData = DataGrabber();

  const searchButton = async () => {
    let button = document.querySelector(".searchBtn");
    button.addEventListener("click", () => {
      weatherData.returnEverything(0, inputGrabber());
      //   weatherData.asyncDatesDays()
      console.log(weatherData.getWeatherData());
    });
  };

  const inputGrabber = () => {
    let input = document.querySelector("#search").value;
    // document.querySelector('#search').value = '';
    return input;
  };

  const dayButtons = () => {
    const parent = document.querySelector(".day-button__container");
    for (let i = 0; i < 7; i++) {
      let button = DOMgen.makeButton();
      button.textContent = weatherData.asyncDatesDays(i);
      parent.appendChild(button);
    }
  };

  const cityButtons = () => {
    let cities = Array.from(document.querySelectorAll(".cities__list button"));

    cities.forEach((city) => {
      city.addEventListener("click", () => {
        console.log(city.textContent);
        weatherData.returnEverything(0, city.textContent);
      });
    });
  };

  return { searchButton, dayButtons, cityButtons };
}
let test2 = ButtonPlacer();
test2.searchButton();
test2.cityButtons();
// let test = DataGrabber();
// let button = document.querySelector(".searchBtn");
// button.addEventListener("click", () => {
//   test.returnData(0);
// //   test2.c
// });

// let button2 = document.querySelector(".testbtn");
// button2.addEventListener("click", () => {
//   test2.dayButtons();
// });
