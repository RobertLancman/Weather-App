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
    
        let weather = [];        
        for(let i=0; i < data.consolidated_weather.length; i++) {
            weather.push(data.consolidated_weather[i]);
          }



        this.viewElems.weatherCity.innerText = `Weather in ${data.title}`;
        this.viewElems.weatherIcon.src = `https://www.metaweather.com/static/img/weather/${weather[0].weather_state_abbr}.svg`
        
        this.viewElems.wind_direction_compass.innerText = weather[0].wind_direction_compass; 
        this.viewElems.wind_icon.src =`https://www.metaweather.com/static/img/windarrow.svg`
        this.viewElems.wind_icon.style.transform = `rotate(${Math.round(weather[0].wind_direction - 180)}deg)`;
        this.viewElems.wind_speed.innerText = `${weather[0].wind_speed.toFixed(2)} mph`

        this.viewElems.weatherIcon.alt = weather[0].weather_state_name;
        this.viewElems.weather_state_name.innerText = weather[0].weather_state_name;
        
        const currTemp = Math.round(weather[0].the_temp);
        const maxTemp = Math.round(weather[0].max_temp);
        const minTemp = Math.round(weather[0].min_temp);
    
    
        this.viewElems.weatherCurrentTemp.innerText = `${currTemp}°C`;
        this.viewElems.weatherMaxTemp.innerText = `Max temperature: ${maxTemp}°C`;
        this.viewElems.weatherMinTemp.innerText = `Min temperature: ${minTemp}°C`;

        this.viewElems.air_pressure.innerText = `Air pressure: ${weather[0].air_pressure.toFixed(2)} hPa`;
        this.viewElems.humidity.innerText = `Humidity: ${weather[0].humidity} %`;

      //  console.log(weather[1].weather_state_abbr);

          let applicable_date_small = document.querySelectorAll('.applicable_date_small');
          let weatherCurrentTemp_small = document.querySelectorAll('.weatherCurrentTemp_small');
          let weatherIcon_small = document.querySelectorAll('.weatherIcon_small');

          let weatherMaxTemp_small = document.querySelectorAll('.weatherMaxTemp_small');
          let weatherMinTemp_small = document.querySelectorAll('.weatherMinTemp_small');

          let wind_icon_small = document.querySelectorAll('.wind_icon_small');
          let wind_speed_small = document.querySelectorAll('.wind_speed_small');



          for(let i = 0; i < 6; i++ ) {
            applicable_date_small[i].innerText = weather[i].applicable_date;
            weatherCurrentTemp_small[i].innerText = `${Math.round(weather[i].the_temp)}°C`;
            weatherIcon_small[i].src = `https://www.metaweather.com/static/img/weather/${weather[i].weather_state_abbr}.svg`;
            
            weatherMaxTemp_small[i].innerText = `Max: ${Math.round(weather[i].max_temp)}°C`;
            weatherMinTemp_small[i].innerText = `Min: ${Math.round(weather[i].min_temp)}°C`;

            wind_icon_small[i].src =`https://www.metaweather.com/static/img/windarrow.svg`;
            wind_icon_small[i].style.transform = `rotate(${Math.round(weather[i].wind_direction - 180)}deg)`;
            wind_speed_small[i].innerText = `${weather[i].wind_speed.toFixed(2)} mph`;

            
          }
    }  

}





 
document.addEventListener('DOMContentLoaded', new WeatherApp());