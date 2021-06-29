import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './css/styles.css';
import GiphyService from './giphy-service.js'; //imports WeatherService object which makes an API call from Open Weather API to request specific weather data
// import template from './template.js';

function clearFields() { //Create function to empty input fields  
  $('#search-giphy').val("");
}


$(document).ready(function () {
  $('#search-button').click(function (event) {
    event.preventDefault();
    let userSearch = $('#search-giphy').val(); //Save input in city value
    console.log(userSearch)
    clearFields(); //Calling function to empty input fields 

    let promise = GiphyService.getGiphy(userSearch); //References WeatherService object in imported function
    console.log(promise);
    promise.then(function (response) { //.then is one of three methods of the XHR object --> it handles both a results response and a rejected response
      const body = JSON.parse(response); //If we get a response then we parse the response --> meaning turning the string into an object
      console.log(body.data[0].images.downsized.url);
      for (let i=0; i <= 5; i++) {
      $('.search-result').append(`<img src='${body.data[i].images.downsized.url}' alt='${userSearch}'>`); //shows city(var where the location is saved from user input), body.main.humidity --> pulling the data from the parsed response    ${body.main.humidity
    }
    }, function (error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`); //If there we don't get a response then it displays the error message
    });
  });
});