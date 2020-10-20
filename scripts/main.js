import {getWeatherByCity} from './apiService.js'



const viewElems = {};

 let getDOMElem = id => {
    return document.getElementById(id);
}




const connectHTMLElems  = () => {
    viewElems.mainContainer = getDOMElem('mainContainer');
    viewElems.weatherSearchView = getDOMElem('weatherSearchView');
    viewElems.weatherForecastView = getDOMElem('weatherForecastView');

    viewElems.searchInput = getDOMElem('searchInput');
    viewElems.searchButton = getDOMElem('searchButton');
    viewElems.weatherCityContainer = getDOMElem('weatherCityContainer');


    viewElems.weatherCity = getDOMElem('weatherCity');
    viewElems.weatherIcon = getDOMElem('weatherIcon');

    viewElems.weatherCity = getDOMElem('weatherCity');
    viewElems.weatherMaxTemp = getDOMElem('weatherMaxTemp');
    viewElems.weatherMaxTemp = getDOMElem('weatherMaxTemp');

    viewElems.returnToSearchBtn = getDOMElem('returnToSearchBtn');
}


const setupListeners = () => {
    viewElems.searchInput.addEventListener('keydown', onEnterSubmit);
    viewElems.searchButton.addEventListener('keydown', onClickSubmit);
}


const initializeApp = () => {
    connectHTMLElems();
    setupListeners();
}


const onEnterSubmit = event => {
    if (event.key === 'Enter') {
        let query = viewElems.searchInput.value;
        getWeatherByCity(query).then(data => {
            console.log(data);
        });
    }
}



const onClickSubmit = () => {
    
}




 
document.addEventListener('DOMContentLoaded', initializeApp);