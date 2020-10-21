import {getWeatherByCity} from './apiService.js'
import {mapListToDOMElements} from './DOMActions.js'


class WeatherApp  {
    constructor() {
        this.viewElems = {};
        this.initializeApp();
    }
    initializeApp = () => {
        this.connectDOMElements();
        this.setupListeners();
    }



    connectDOMElements = () => {
        const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id);
        this.viewElems = mapListToDOMElements(listOfIds);
    }
 
    setupListeners = () => {
        this.viewElems.searchInput.addEventListener('keydown', this.handleSubmit);
        this.viewElems.searchButton.addEventListener('click', this.handleSubmit);
        this.viewElems.returnToSearchBtn.addEventListener('click', this.returnToSearch);
    }

    handleSubmit = () => {
        if (event.type === 'click' || event.key === 'Enter') {
            this.fadeInOut();

            let query = this.viewElems.searchInput.value;
            getWeatherByCity(query).then(data => {
                this.displayWeatherData(data);
                this.viewElems.searchInput.style.borderColor="black";
                this.viewElems.errorInfo.innerText = "";
            }).catch(() => {
                this.fadeInOut();
                this.viewElems.searchInput.style.borderColor="red";
                this.viewElems.errorInfo.style.color="red";
                this.viewElems.errorInfo.innerText = "Sorry, not found a city with that name";
            })
        }
    }

    fadeInOut = () => {
        if (this.viewElems.mainContainer.style.opacity === '1' || this.viewElems.mainContainer.style.opacity === '') {
            this.viewElems.mainContainer.style.opacity = '0';
        } else {
            this.viewElems.mainContainer.style.opacity = '1';
        }
    }


    switchView = () => {
        if (this.viewElems.weatherSearchView.style.display !== 'none') {
            this.viewElems.weatherSearchView.style.display = 'none';
            this.viewElems.weatherForecastView.style.display = 'block';
        } else {
            this.viewElems.weatherSearchView.style.display = 'block';
            this.viewElems.weatherForecastView.style.display = 'none';
        }
    }

    returnToSearch = () => {
        this.fadeInOut();
    
        setTimeout(() => {
            this.switchView()
            this.fadeInOut();
        }, 500);
    }

    displayWeatherData = data => {
        this.switchView();
        this.fadeInOut();
    
        const weather = data.consolidated_weather[0];
    console.log(weather);
    
        this.viewElems.weatherCity.innerText = `Weather in ${data.title}`;
        this.viewElems.weatherIcon.src = `https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`
        
        this.viewElems.wind_direction_compass.innerText = weather.wind_direction_compass; 
        this.viewElems.wind_icon.src =`https://www.metaweather.com/static/img/windarrow.svg`
        this.viewElems.wind_icon.style.transform = `rotate(${Math.round(weather.wind_direction - 180)}deg)`;
        this.viewElems.wind_speed.innerText = `${weather.wind_speed.toFixed(2)} mph`

        this.viewElems.weatherIcon.alt = weather.weather_state_name;
        this.viewElems.weather_state_name.innerText = weather.weather_state_name;
        
        const currTemp = Math.round(weather.the_temp);
        const maxTemp = Math.round(weather.max_temp);
        const minTemp = Math.round(weather.min_temp);
    
    
        this.viewElems.weatherCurrentTemp.innerText = `${currTemp}°C`;
        this.viewElems.weatherMaxTemp.innerText = `Max temperature: ${maxTemp}°C`;
        this.viewElems.weatherMinTemp.innerText = `Min temperature: ${minTemp}°C`;

        this.viewElems.air_pressure.innerText = `Air pressure: ${weather.air_pressure.toFixed(2)} hPa`
        this.viewElems.humidity.innerText = `Humidity: ${weather.humidity} %`;
    }  

}





 
document.addEventListener('DOMContentLoaded', new WeatherApp());