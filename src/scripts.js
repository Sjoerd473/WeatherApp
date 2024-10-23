import "./styles.css";
import { DOMgen } from "./DOMgenerator.js"

// link using latitude and longitude
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/38.9697,-77.385?key=YOUR_API_KEY 
// {mode: 'cors'}


let button = document.querySelector('.btnSearch')

button.addEventListener('click', () =>{
    let input = document.getElementById('search').value
    
    pageSetter(input)
})
const weatherData = async function (input) {
   let results = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?unitGroup=metric&key=57279EDE8NTFP5ZE9WC6AJK6X&contentType=json`)
   let weatherData = await results.json()
   console.log(weatherData)
   return weatherData;
}

// function temp(){
//     console.log(weatherData.currentConditions.temp)
// }

const asyncTemp = async function (input){
    let data = await weatherData(input)
    
    
     return data.currentConditions.temp
}

async function asyncConditions(input){
    let data = await weatherData(input)
     return data.currentConditions.conditions
}

async function asyncHumidity(input){
    let data = await weatherData(input)
     return data.currentConditions.humidity
}


// // temp()
// getHumidity()

//  function getHumidity(){
//     // await weatherData()
//       asyncTemp()
// }
async function pageSetter(input){
    let one = document.querySelector('.one')
    let two = document.querySelector('.two')
    let three = document.querySelector('.three')
    let four = await asyncTemp(input)
    let five = await asyncConditions(input)
    let six = await asyncHumidity(input)
    
    one.textContent = four
    two.textContent = five
    three.textContent = six
}

// pageSetter()