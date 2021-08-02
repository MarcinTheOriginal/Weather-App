const input = document.querySelector('input');
const btn = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const feels = document.querySelector('.feels');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=';
const apiUnits = '&units=metric';

const $defaultCity = 'Konin';
let $city;
let $url;

const getWeather = () => {

    //zapobiega powrotowi do domyślnego miasta po wybraniu "wyślij" z pustym inputem
    if (input.value === '') {
        if (cityName.textContent === '') $city = $defaultCity;
        else $city = cityName.textContent;
    } else $city = input.value;

    //$city = (input.value) ? input.value : $city = $defaultCity;
    $url = apiLink + $city + apiKey + apiUnits;

    axios.get($url).then(response => {
        const temp = Math.round(response.data.main.temp);
        const tempFeels = Math.round(response.data.main.feels_like);
        const status = Object.assign({}, ...response.data.weather)//obiekt z postaci ({}) (bo taką dawało response.data.weather) za pomocą ... został rozsmarowany do pierwszego pustego obiektu i teraz mam dostęp do poszczególnych indeksów
        
        cityName.textContent = response.data.name;
        weather.textContent = status.main;
        temperature.textContent = temp + '°C';
        feels.textContent = tempFeels + '°C';

        if (status.id >= 200 && status.id <300)
            photo.setAttribute("src", "WeatherApp grafiki/thunderstorm.png")
        else if (status.id >= 300 && status.id <400)
            photo.setAttribute("src", "WeatherApp grafiki/drizzle.png")
        else if (status.id >= 500 && status.id <600)
            photo.setAttribute("src", "WeatherApp grafiki/snow.png")
        else if (status.id >= 700 && status.id <800)
            photo.setAttribute("src", "WeatherApp grafiki/fog.png")
        else if (status.id === 800)
            photo.setAttribute("src", "WeatherApp grafiki/sun.png")
        else if (status.id >= 800 && status.id <805)
            photo.setAttribute("src", "WeatherApp grafiki/cloud.png")
        else 
            photo.setAttribute("src", "WeatherApp grafiki/unknown.png")

        warning.textContent = '';
        input.value = '';

    }).catch(() => warning.textContent = "Wpisz poprawną nazwę miasta.");
};

const checkEnter = (e) => {
    if(e.keyCode === 13) {
        getWeather();
    }
};

getWeather();
btn.addEventListener('click', getWeather);
input.addEventListener('keyup', checkEnter);
