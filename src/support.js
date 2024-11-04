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
import { giphyGrabber } from "./gif";

function supportFunction() {
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
      return number + "°C";
    } else if (radio === "fahrenheit") {
      return Math.ceil((number * 9) / 5 + 32) + "°F";
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

  const buttonSwapper = (e) => {
    let parent = document.querySelector(".day-button__container");
    if (!document.querySelector(".button__focus")) {
      parent.firstElementChild.classList.toggle("button__focus");
    } else {
      let oldButton = document.querySelector(".button__focus");
      oldButton.classList.toggle("button__focus");

      e.target.closest("button").classList.toggle("button__focus");
    }
  };

  const hiddenSwapper = () => {
    document.querySelectorAll(".hidden").forEach((element) => {
      element.removeAttribute("hidden");
    });
  };

  const gifGenerator =  async (icon) => {
    switch (icon) {
      case "snow":
      case "snow-showers-day":
      case "snow-showers-night":
        return await giphyGrabber.grabImage('snow');

      case "thunder-rain":
      case "thunder-showers-day":
      case "thunder-showers-night":
        return giphyGrabber.grabImage("thunder");

      case "rain":
      case "showers-day":
      case "showers-night":
        return giphyGrabber.grabImage("rain");

      case "fog":
        return giphyGrabber.grabImage("fog");

      case "wind":
        return giphyGrabber.grabImage("wind");

      case "cloudy":
      case "partly-cloudy-day":
      case "partly-cloudy-night":
        console.log(giphyGrabber.grabImage("clouds"))
        return await giphyGrabber.grabImage("clouds");

      case "clear-day":
      case "clear-night":
        return giphyGrabber.grabImage("sun");
    }
  };

  return {
    windDirChecker,
    tempChecker,
    iconInterpreter,
    buttonSwapper,
    hiddenSwapper,
    gifGenerator,
  };
}

export const supportFunctions = supportFunction();
