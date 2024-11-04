import "./styles.css";
import { DOMgen } from "./DOMgenerator.js";
import { supportFunctions } from "./support.js";
import triangleRight from "./images/triangle-right-svgrepo-com.svg"
import triangleLeft from "./images/triangle-left-svgrepo-com.svg"

// link using latitude and longitude
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/38.9697,-77.385?key=YOUR_API_KEY
// {mode: 'cors'}

function DataGrabber() {
  let allWeatherData;

  const parent = document.querySelectorAll(`[data-row]`);
  const buttonParent = document.querySelector(".day-button__container");
  const parentLeft = document.querySelector(".daily__container-left");
  const parentRight = document.querySelector(".daily__container-right");

  const weatherData = async function (input) {
    try {let results = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?unitGroup=metric&key=57279EDE8NTFP5ZE9WC6AJK6X&contentType=json&lang=it`
    );
    let weatherData = await results.json();
    allWeatherData = weatherData;
    console.log(weatherData);
    return weatherData;
  } catch(error){
    alert('Something went wrong, try again.')
  }
  };

  const getWeatherData = () => {
    return allWeatherData;
  };

  const asyncTimeHours = async (day) => {
    for (let i = 0; i < 24; i++) {
      let date = allWeatherData.days[day].hours[i].datetime;

      // console.log(date)
      parent[i].children[0].textContent = date;
    }
  };

  const asyncIconHours = async (day) => {
    for (let i = 0; i < 24; i++) {
      let icon = allWeatherData.days[day].hours[i].icon;
      let image = DOMgen.makeImage();
      parent[i].children[1].replaceChildren();
      image.src = supportFunctions.iconInterpreter(icon);
      parent[i].children[1].appendChild(image);

      // console.log(icon)
      // parent[i].children[1].textContent = icon;
    }
  };

  const asyncTempHours = async (day) => {
    for (let i = 0; i < 24; i++) {
      let temp = allWeatherData.days[day].hours[i].temp;

      // console.log(temp)
      parent[i].children[2].textContent = supportFunctions.tempChecker(temp);
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
      ].children[4].textContent = `Velocita : ${windSpeed}km/h  Direzione : ${supportFunctions.windDirChecker(
        windDir
      )}`; // to change into something
    }
  };

  const asyncTempFeelHours = async (day) => {
    for (let i = 0; i < 24; i++) {
      let tempFeel = allWeatherData.days[day].hours[i].feelslike;

      // console.log(temp)
      parent[i].children[5].textContent =
        supportFunctions.tempChecker(tempFeel);
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

  const asyncDatesDays = async (start, finish) => {
    buttonParent.replaceChildren(); //can this be done differently?
    for (let i = start; i < finish; i++) {
      let input = document.querySelector("#search").value;
      let p = DOMgen.makePara();
      let temp = DOMgen.makePara();
      temp.classList.add('button__temp')
      temp.textContent = supportFunctions.tempChecker(allWeatherData.days[i].temp)
      let date = allWeatherData.days[i].datetime;
      let button = DOMgen.makeButton("", "day-button");
      let image = DOMgen.makeImage();
      image.src = supportFunctions.iconInterpreter(allWeatherData.days[i].icon);

      p.textContent = date;
      button.appendChild(image);
      button.appendChild(p);
      button.appendChild(temp);
      buttonParent.appendChild(button);

      if (i === 0 && !document.querySelector('.button__focus') ) {button.classList.toggle('button__focus')}
     

      button.addEventListener("click", (e) => {
        returnData(i);
        supportFunctions.buttonSwapper(e)
      });
      
      // buttonParent.children[i].textContent = date
    }
    let buttonParent2 = document.querySelector('.forecast__container')
    let buttonLeft = DOMgen.makeButton("", "day-button-left");
    let buttonRight = DOMgen.makeButton("", "day-button-right");
    let buttonImageRight = DOMgen.makeImage();
    let buttonImageLeft = DOMgen.makeImage();
    buttonImageRight.src = triangleRight
    buttonImageLeft.src = triangleLeft
    buttonParent2.appendChild(buttonRight)
    buttonParent2.appendChild(buttonLeft)
    buttonLeft.appendChild(buttonImageLeft)
    buttonRight.appendChild(buttonImageRight)
    buttonRight.addEventListener('click', () =>{
       
      asyncDatesDays(8, 15) 
      asyncDayForecast(8);
      supportFunctions.buttonSwapper()
      
    })

    buttonLeft.addEventListener('click', (e) =>{
      asyncDatesDays(0, 7);
      asyncDayForecast(0);
      // supportFunctions.buttonSwapper(e);
    })

  };

  const asyncAddress = async () => {
    let address = allWeatherData.resolvedAddress;
    let p = DOMgen.makePara();
    p.textContent = "Previsione per : " + address;
    parentLeft.appendChild(p);
  };

  const asyncDayDescription = async (day) => {
    let description = allWeatherData.days[day].description;
    let p = DOMgen.makePara();
    p.textContent = description;
    parentLeft.appendChild(p);
  };

  const asyncDayTemp = async (day) => {
    let container = DOMgen.makeDiv("daily__tempdata");
    let tempMin = supportFunctions.tempChecker(
      allWeatherData.days[day].tempmin
    );
    let tempMax = supportFunctions.tempChecker(
      allWeatherData.days[day].tempmax
    );

    let p1 = DOMgen.makePara();
    let p2 = DOMgen.makePara();
    p1.textContent = "Minima: " + tempMin;
    p2.textContent = "Massima: " + tempMax;
    parentLeft.appendChild(container);
    container.appendChild(p1);
    container.appendChild(p2);
  };

  // const asyncDayTempFeel = async(day) =>{
  //   let tempMin = supportFunctions.tempChecker(allWeatherData.days[day].feelslikemin)
  //   let tempMax = supportFunctions.tempChecker(allWeatherData.days[day].feelslikemax)
  //   let p = DOMgen.makePara()
  //   p.textContent = 'Minima: ' + tempMin + 'Massima: ' + tempMax
  //   parentLeft.appendChild(p)
  // }

  const asyncDate = async (day) => {
    let date = allWeatherData.days[day].datetime;
    let p = DOMgen.makePara();
    p.textContent = date;
    parentRight.appendChild(p);
  };

  const asyncDaySun = async (day) => {
    //Use SVG for the sunset sunrise
    let container = DOMgen.makeDiv("daily__sundata");
    let sunup = allWeatherData.days[day].sunrise;
    let sundown = allWeatherData.days[day].sunset;

    let p1 = DOMgen.makePara();
    let p2 = DOMgen.makePara();
    p1.textContent = "Alba: " + sunup;
    p2.textContent = "Tramonto: " + sundown;
    parentRight.appendChild(container);
    container.appendChild(p1);
    container.appendChild(p2);
  };

  const asyncDayRain = async (day) => {
    let container = DOMgen.makeDiv("daily__raindata");
    let rain = allWeatherData.days[day].precip;
    let rainChance = allWeatherData.days[day].precipprob;

    let p1 = DOMgen.makePara();
    let p2 = DOMgen.makePara();
    p1.textContent = "Quantita di pioggia: " + rain + "mm";
    p2.textContent = "Probabilita: " + rainChance;
    parentRight.appendChild(container);
    container.appendChild(p1);
    container.appendChild(p2);
  };

  const asyncDayWind = async (day) => {
    let container = DOMgen.makeDiv("daily__winddata");
    let winddir = supportFunctions.windDirChecker(
      allWeatherData.days[day].winddir
    );
    let windspeed = allWeatherData.days[day].windspeed;
    let p1 = DOMgen.makePara();
    let p2 = DOMgen.makePara();
    p1.textContent = "Vento: " + winddir;
    p2.textContent = "Velocita: " + windspeed + "km/h";
    parentRight.appendChild(container);
    container.appendChild(p1);
    container.appendChild(p2);
  };

  const asyncDayConditions = async (day) => {
    let conditions = allWeatherData.days[day].conditions;
    let p = DOMgen.makePara();
    p.textContent = conditions;
    parentLeft.appendChild(p);
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
    
    await asyncDayForecast(day);
  };

  const returnEverything = async (day, input) => {
    await weatherData(input);
    await asyncDatesDays(0, 7);
    await returnData(day);
    await supportFunctions.hiddenSwapper()
  };

  const asyncDayForecast = async (day) => {
    parentLeft.replaceChildren();
    parentRight.replaceChildren();
    await asyncAddress();
    await asyncDayConditions(day);
    await asyncDayDescription(day);
    await asyncDayTemp(day);
    // await asyncDayTempFeel(day);
    await asyncDate(day);
    await asyncDaySun(day);
    await asyncDayRain(day);
    await asyncDayWind(day);
  };
  return { returnData, returnEverything, getWeatherData, asyncDatesDays };
}

function ButtonPlacer() {
  const weatherData = DataGrabber();

  const searchButton = async () => {
    let button = document.querySelector(".searchBtn");
    button.addEventListener("click", () => {
      weatherData.returnEverything(0, inputGrabber());

      console.log(weatherData.getWeatherData());
    });
  };

  const searchField = async () =>{
    let field = document.querySelector('#search')
    field.addEventListener('keyup', (e) =>{
      if (e.keyCode === 13) {
        e.preventDefault();
        document.querySelector(".searchBtn").click()
      }
    })
  }

  const inputGrabber = () => {
    let input = document.querySelector("#search").value;
    // document.querySelector('#search').value = '';
    return input;
  };

//   const dayButtons = () => {
//     const parent = document.querySelector(".day-button__container");
//     let button = DOMgen.makeButton();
//     for (let i = 0; i < 7; i++) {
//       if (i === 0) {
//         console.log("boops");
//         button.classList.add("button__focus")
//         button.textContent = weatherData.asyncDatesDays(i);
//         parent.appendChild(button);;
//       } else{
// console.log('baps')
//       button.textContent = weatherData.asyncDatesDays(i);
//       parent.appendChild(button);
//       }
//     }
//   };

  const cityButtons = () => {
    let cities = Array.from(document.querySelectorAll(".cities__list button"));

    cities.forEach((city) => {
      city.addEventListener("click", () => {
        console.log(city.textContent);
        weatherData.returnEverything(0, city.textContent);
      });
    });
  };

  return { searchButton,  cityButtons, searchField };
}
let test2 = ButtonPlacer();
test2.searchButton();
test2.cityButtons();
test2.searchField();
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
