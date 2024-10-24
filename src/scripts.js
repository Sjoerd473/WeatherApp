import "./styles.css";
import { DOMgen } from "./DOMgenerator.js";

// link using latitude and longitude
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/38.9697,-77.385?key=YOUR_API_KEY
// {mode: 'cors'}

function DataGrabber() {
  let allWeatherData ;

  let parent = document.querySelectorAll(`[data-row]`);
  let buttonParent = document.querySelector(".day-button__container");

  const weatherData = async function (input) {
    let results = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?unitGroup=metric&key=57279EDE8NTFP5ZE9WC6AJK6X&contentType=json&lang=id`
    );
    let weatherData = await results.json();
    allWeatherData = weatherData;
    console.log(weatherData);
    return weatherData;
  };

  const getWeatherData =  () => {
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

  const asyncIconHours = async (day) => {
    for (let i = 0; i < 24; i++) {
      let icon = allWeatherData.days[day].hours[i].icon;

      // console.log(icon)
      parent[i].children[1].textContent = icon;
    }
  };

  const asyncTempHours = async (day) => {
    for (let i = 0; i < 24; i++) {
      let temp = allWeatherData.days[day].hours[i].temp;

      // console.log(temp)
      parent[i].children[2].textContent = temp;
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
      ].children[4].textContent = `Speed : ${windSpeed}  Direction : ${windDir}`; // to change into something
    }
  };

  const asyncTempFeelHours = async (day) => {
    for (let i = 0; i < 24; i++) {
      let tempFeel = allWeatherData.days[day].hours[i].feelslike;

      // console.log(temp)
      parent[i].children[5].textContent = tempFeel;
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

  const asyncDatesDays = async (day) =>{
    buttonParent.replaceChildren() //can this be done differently?
    for (let i = 0; i< 7; i++){
        let input = document.querySelector('#search').value
    let date = allWeatherData.days[i].datetime
    let button = DOMgen.makeButton();

    button.textContent = date
   
    buttonParent.appendChild(button);

    button.addEventListener('click', () =>{
        returnData(i, input)
        
    })
    // buttonParent.children[i].textContent = date
    
    }
  }
  const returnData = async (day, input) => {
    if (typeof(allWeatherData) != 'object' ){
        await weatherData(input);
        console.log('boop')
    }
    
    await asyncTimeHours(day);
    await asyncTempHours(day);
    await asyncIconHours(day);
    await asyncRainHours(day);
    await asyncWindHours(day);
    await asyncTempFeelHours(day);
    await asyncUVHours(day);
    await asyncPressureHours(day);
    await asyncDatesDays()
  };
  return { returnData, getWeatherData, asyncDatesDays };
}

function ButtonPlacer() {
  const weatherData = DataGrabber();

  const searchButton = async () => {
    let button = document.querySelector(".searchBtn");
    button.addEventListener("click", () => {
      weatherData.returnData(0, inputGrabber());
    //   weatherData.asyncDatesDays()
      console.log(weatherData.getWeatherData());
    });
  };

  const inputGrabber = () => {
    let input = document.querySelector('#search').value
    // document.querySelector('#search').value = '';
    return input;
  }

  const dayButtons = () => {
    const parent = document.querySelector(".day-button__container");
    for (let i = 0; i < 7; i++) {
      let button = DOMgen.makeButton();
      button.textContent = weatherData.asyncDatesDays(i);
      parent.appendChild(button);
    }
  };

  return { searchButton, dayButtons };
}
let test2 = ButtonPlacer();
test2.searchButton();
;
// let test = DataGrabber();
// let button = document.querySelector(".searchBtn");
// button.addEventListener("click", () => {
//   test.returnData(0);
// //   test2.c
// });

let button2 = document.querySelector(".testbtn");
button2.addEventListener("click", () => {
  test2.dayButtons();
});
