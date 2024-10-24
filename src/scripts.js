import "./styles.css";
import { DOMgen } from "./DOMgenerator.js";

// link using latitude and longitude
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/38.9697,-77.385?key=YOUR_API_KEY
// {mode: 'cors'}

function DataGrabber() {
  let allWeatherData = {};

  const weatherData = async function (input) {
    let results = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/verona?unitGroup=metric&key=57279EDE8NTFP5ZE9WC6AJK6X&contentType=json`
    );
    let weatherData = await results.json();
    allWeatherData = weatherData;
    console.log(weatherData);
    return weatherData;
  };

  const allData = weatherData(); //this makes the function work

  const asyncDataPicker = function (input) {
    let data = weatherData;
  };



  const asyncTimeHours = async (day) => {
    
    // let length = allWeatherData.days[0].hours.length;
        for(let i = 0; i < 24; i++){
            let parent = document.querySelectorAll(`[data-row]`)
            let date = allWeatherData.days[day].hours[i].datetime;

            console.log(date)
             parent[i].children[0].textContent = date
        }
  };

  const asyncIconHours = async (day) =>{
    for (let i = 0 ; i < 24; i++){
        let parent = document.querySelectorAll(`[data-row]`)
            let icon = allWeatherData.days[day].hours[i].icon;

            console.log(icon)
            parent[i].children[1].textContent = icon
    }
  }

  const asyncTempHours = async (day) =>{
    for (let i = 0 ; i < 24; i++){
        let parent = document.querySelectorAll(`[data-row]`)
            let temp = allWeatherData.days[day].hours[i].temp;

            console.log(temp)
            parent[i].children[2].textContent = temp
    }
  }

  const asyncTemp = async function (input) {
    // let data = await weatherData(input)

    return allWeatherData.currentConditions.temp;
  };

  const asyncConditions = async function (input) {
    // let data = await weatherData(input)
    return allWeatherData.currentConditions.conditions;
  };

  const asyncHumidity = async function (input) {
    // let data = await weatherData(input)
    return allWeatherData.currentConditions.humidity;
  };
  const returnData = async (day) => {
    // console.log(await asyncConditions());
    // console.log(await asyncTemp());
    // console.log(await asyncHumidity());
     await asyncTimeHours(day)
     await asyncTempHours(day)
     await asyncIconHours(day)
  };
  return { returnData };
}

let test = DataGrabber();
let button = document.querySelector(".searchBtn");
button.addEventListener("click", () => {
  test.returnData(0);
});

const weatherData = async function (input) {
  let results = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?unitGroup=metric&key=57279EDE8NTFP5ZE9WC6AJK6X&contentType=json`
  );
  let weatherData = await results.json();
  console.log(weatherData);
  return weatherData;
};
// let test = await weatherData()

// function temp(){
//     console.log(weatherData.currentConditions.temp)
// }

const asyncTemp = async function (input) {
  let data = await weatherData(input);

  return data.currentConditions.temp;
};

async function asyncConditions(input) {
  let data = await weatherData(input);
  return data.currentConditions.conditions;
}

async function asyncHumidity(input) {
  let data = await weatherData(input);
  return data.currentConditions.humidity;
}

// // temp()
// getHumidity()

//  function getHumidity(){
//     // await weatherData()
// //       asyncTemp()
// // }
// async function pageSetter(input){
//     let one = document.querySelector('.one')
//     let two = document.querySelector('.two')
//     let three = document.querySelector('.three')
//     let four = await asyncTemp(input)
//     let five = await asyncConditions(input)
//     let six = await asyncHumidity(input)

//     one.textContent = four
//     two.textContent = five
//     three.textContent = six
// }

// pageSetter()
