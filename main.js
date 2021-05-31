const input = document.querySelector('import');
const btn = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const feels = document.querySelector('.feels');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=976496ddd59a03609dd2d3e707c4c831';
const apiUnits = '&units=metric';

let $city = 'konin';
let $url;

const getWeather = () => {
    $url = apiLink + $city + apiKey + apiUnits;

    axios.get($url).then(response => {
        console.log(response.data.main);
        const temp = Math.round(response.data.main.temp);
        const tempFeels = Math.round(response.data.main.feels_like);

        cityName.textContent = response.data.name;
        temperature.textContent = temp + '°C';
        feels.textContent = tempFeels + '°C';
    });
}

getWeather();