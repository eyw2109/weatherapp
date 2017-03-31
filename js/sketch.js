// **** Global variables ****//
var apiKey = '4c61bf52086c0c638249b02e7269d3f8';
var baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
var fiveDayURL = 'http://api.openweathermap.org/data/2.5/forecast?q=';
var city;
var units = 'imperial';
var weatherData;
var forecastData;
// Temperature //
var temperature = 0;
var temperature1 = 0;
var temperature2 = 0;
var temperature3 = 0;
var temperature4 = 0;
// High Temp //
var highTemp = 0;
var highTemp1 = 0;
var highTemp2 = 0;
var highTemp3 = 0;
var highTemp4 = 0;
// Low Temp //
var lowTemp = 0;
var lowTemp1 = 0;
var lowTemp2 = 0;
var lowTemp3 = 0;
var lowTemp4 = 0;
// Humidity //
var humidity = 0;
var humidity1 = 0;
var humidity2 = 0;
var humidity3 = 0;
var humidity4 = 0;

var description;
// Days 
var day1 = 0;
var day2 = 0;
var day3 = 0;
var day4 = 0;
var day5 = 0;

var button;
var queryText;
var cnv;
var secondTitle;
var date;
var monthNames = ["Month", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
// **** Preload function ****//


// **** Setup function **** //
function setup(){
    var cnv = createCanvas(1100, 1000);
    cnv.parent('canvas-holder');
    button = select('#submit');
    city = select('#city');
    button.mousePressed(queryAPI);
    button.mousePressed(queryFiveDay);
    button.mousePressed(forecastTitle);
    button.mousePressed(queryDate);
    //queryText.position(500, 800);
    city.position(800, 800);
    button.position(city.x + city.width, 800);
    city.style('font-family', 'Roboto Condensed')
}

function keyPressed() {
    if(keyCode == ENTER) {
        queryAPI();
        queryFiveDay();
        forecastTitle();
        queryDate();
    } else if (keyCode == RETURN) {
        queryAPI();
        queryFiveDay();
        forecastTitle();
        queryDate();
    }
}

function forecastTitle(title){
    secondTitle = title;
}

function queryDate(calendar){
    date = calendar;
    m = month();
    d = day();
    y = year();
}

function queryAPI(){
    var query = baseURL + city.value() + '&apiKey=' + apiKey + '&units=' + units;  
    loadJSON(query, getWeatherData);
}
function getWeatherData(apiData){
    weatherData = apiData;
    temperature = weatherData.main.temp;
    humidity = weatherData.main.humidity;
    highTemp = weatherData.main.temp_max;
    lowTemp = weatherData.main.temp_min;
    description = weatherData.weather[0].description;
    console.log(weatherData);
}

function queryFiveDay(){
    var FiveDay = fiveDayURL + city.value() + '&apiKey=' + apiKey + '&units=' + units;
    loadJSON(FiveDay, getForecastData);
}

function getForecastData(apiFiveDayData){
    forecastData = apiFiveDayData;
    day1 = forecastData.list[3].dt_txt;
    temperature1 = forecastData.list[3].main.temp;
    humidity1 = forecastData.list[3].main.humidity;
    highTemp1 = forecastData.list[3].main.temp_max;
    lowTemp1 = forecastData.list[3].main.temp_min;  

    day2 = forecastData.list[11].dt_txt;
    temperature2 = forecastData.list[11].main.temp;
    humidity2 = forecastData.list[11].main.temp;
    highTemp2 = forecastData.list[11].main.temp_max;
    lowTemp2 = forecastData.list[11].main.temp_min;  

    day3 = forecastData.list[19].dt_txt;
    temperature3 = forecastData.list[19].main.temp;
    humidity3 = forecastData.list[19].main.humidity;
    highTemp3 = forecastData.list[19].main.temp_max;
    lowTemp3 = forecastData.list[19].main.temp_min;

    day4 = forecastData.list[27].dt_txt;
    temperature4 = forecastData.list[27].main.temp;
    humidity4 = forecastData.list[27].main.humidity;
    highTemp4 = forecastData.list[27].main.temp_max;
    lowTemp4 = forecastData.list[27].main.temp_min;

    day5 = forecastData.list[35].dt_txt;
    temperature5 = forecastData.list[35].main.temp;
    humidity5 = forecastData.list[35].main.humidity;
    highTemp5 = forecastData.list[35].main.temp_max;
    lowTemp5 = forecastData.list[35].main.temp_min;    
    console.log(forecastData);
}

// **** Draw function **** //
function draw(){
    background('#363940');
    fill(0);
    noStroke();
    colorMode(HSB, 100);
    textSize(25);
    textFont('Roboto Condensed');
    fill(255);
    //queryText = text('Pick City', 400, 800)
    if(weatherData){
        // temperature //
        if (temperature >=0){
        fill(temperature, 50, 100);
        // ellipse(200, 200, 20, 20);
        textSize(200);
        textStyle(BOLD);
        text(int(temperature) + ' DEGREES!', 20, 200);
        textSize(12);
        //text('\n' + m + '.' + d + ' ' + y, 500, 250);
        }

        else {
        fill(temperature, 100, 100);
        // ellipse(200, 200, temperature * 10, temperature * 10);
        textSize(50);
        textStyle(BOLD);
        text(int(temperature) + ' DEGREES!', 20, 200);
        //text('\n' + m + '.' + d + ' ' + y, 500, 250);
        }

        // humidity //
        textSize(20);
        textStyle(NORMAL);
        // ellipse(400, 400, humidity * 10, humidity * 10);
        text('humidity: ' + humidity + '%', 100, 250);

        // high and low //
        text('high: ' + highTemp + '\xB0 F', 450, 250);
        text('low: ' + lowTemp + '\xB0 F', 600, 250);

        // description //
        text(description, 900, 250);
    }

    if(date){
        text('\n' + monthNames[m] + ' ' + d + ', ' + y, 500, 290);
    }

    if(secondTitle){
        textSize(25);
        textStyle(BOLD);
        fill(temperature+30, 50, 100);
        text('Future:', 520, 375);
    }

    if(forecastData){
        colorMode(HSB, 100);
        fill(temperature+20, 50, 100);
        textSize(20);
        textStyle(NORMAL);
        text(day1, 25, 450);
        text('temperature: ' + int(temperature1) + '\xB0 F', 25, 480);
        text('humidity: ' + humidity1 + '%', 25, 500);
        text('high/low: ' + int(highTemp1) + '\xB0 / ' + int(lowTemp1) + '\xB0 F', 25, 520);

        text(day2, 250, 450);
        text('temperature: ' + int(temperature2) + '\xB0 F', 250, 480);
        text('humidity: ' + humidity2 + '%', 250, 500);
        text('high/low: ' + int(highTemp2) + '\xB0 / ' + int(lowTemp2) + '\xB0 F', 250, 520);

        text(day3, 475, 450);
        text('temperature: ' + int(temperature3) + '\xB0 F', 475, 480);
        text('humidity: ' + humidity3 + '%', 475, 500);
        text('high/low: ' + int(highTemp3) + '\xB0 / ' + int(lowTemp3) + '\xB0 F', 475, 520);

        text(day4, 695, 450);
        text('temperature: ' + int(temperature4) + '\xB0 F', 695, 480);
        text('humidity: ' + humidity4 + '%', 695, 500);
        text('high/low: ' + int(highTemp4) + '\xB0 / ' + int(lowTemp4) + '\xB0 F', 695, 520);

        text(day5, 925, 450);
        text('temperature: ' + int(temperature5) + '\xB0 F', 925, 480);
        text('humidity: ' + humidity5 + '%', 925, 500);
        text('high/low: ' + int(highTemp5) + '\xB0 / ' + int(lowTemp5) + '\xB0 F', 925, 520);
    }

}