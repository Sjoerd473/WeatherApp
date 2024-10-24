import "./styles.css";
import { DOMgen } from "./DOMgenerator.js";

// link using latitude and longitude
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/38.9697,-77.385?key=YOUR_API_KEY
// {mode: 'cors'}

function DataGrabber() {
  let allWeatherData = {};

  let parent = document.querySelectorAll(`[data-row]`)

  const weatherData = async function (input) {
    let results = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/verona?unitGroup=metric&key=57279EDE8NTFP5ZE9WC6AJK6X&contentType=json`
    );
    let weatherData = await results.json();
    allWeatherData = weatherData;
    // console.log(weatherData);
    return weatherData;
  };

  const allData = weatherData(); //this makes the function work

  const asyncDataPicker = function (input) {
    let data = weatherData;
  };



  const asyncTimeHours = async (day) => {
    
    // let length = allWeatherData.days[0].hours.length;
        for(let i = 0; i < 24; i++){
            
            let date = allWeatherData.days[day].hours[i].datetime;

            // console.log(date)
             parent[i].children[0].textContent = date
        }
  };

  const asyncIconHours = async (day) =>{
    for (let i = 0 ; i < 24; i++){
        
            let icon = allWeatherData.days[day].hours[i].icon;

            // console.log(icon)
            parent[i].children[1].textContent = icon
    }
  }

  const asyncTempHours = async (day) =>{
    for (let i = 0 ; i < 24; i++){
        
            let temp = allWeatherData.days[day].hours[i].temp;

            // console.log(temp)
            parent[i].children[2].textContent = temp
    }
  }


  const returnData = async (day) => {
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

