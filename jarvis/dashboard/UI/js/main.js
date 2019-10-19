var config = {
    jarvis_home_key: '',
    openweather_key: '1ba6b38a8d342a815f712c216767b991',
    offline_mode: false,
    weather_refresh_rate: 1000*3*60, // recheck weather every 30 mins (1800000  milliseconds)
    location: "London", //function() {
        //fetch('api.jarvis.tk/location/' + this.jarvis_home_key)
          //.then(response => {
            ///return response.json();
    //}
    time_format: 12,
    timezone: (60)* 1, // the number of mins + on UTC (eg 2 = UTC+1:00, 2.5 = UTC+2:30)
}
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var days_abbr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

var d = new Date();
// day
var one = days[d.getDay()];
var two = days[d.getDay()+1];
var three = days[d.getDay()+2];
var four = days[d.getDay()+3];
// date
var dtwo = new Date(d);
dtwo.setDate(d.getDate()+1);
var dthree =  new Date(dtwo);
dthree.setDate(dtwo.getDate()+1);
var dfour =  new Date(dthree);
dfour.setDate(dthree.getDate()+1);
// timestamp
var onet = d.getTime();
var twot = dtwo.getTime();
var threet = dthree.getTime();
var fourt = dfour.getTime();
// make usable in html
  // day full
document.getElementById("day-one-f").innerHTML = one;
document.getElementById("day-two-f").innerHTML = two;
document.getElementById("day-three-f").innerHTML = three;
document.getElementById("day-four-f").innerHTML = four;
  // day abbr
document.getElementById("day-one").innerHTML = days_abbr[one];
document.getElementById("day-two").innerHTML = day_abbr[two];
document.getElementById("day-three").innerHTML = day_abbr[three];
document.getElementById("day-four").innerHTML = day_abbr[four];
  // date
document.getElementById("day-one-date").innerHTML = d;
document.getElementById("day-two-date").innerHTML = dtwo;
document.getElementById("day-three-date").innerHTML = dthree;
document.getElementById("day-four-date").innerHTML = dfour
  // timestamp
document.getElementById("day-one-timestamp").innerHTML = onet;
document.getElementById("day-one-timestamp").innerHTML = twot;
document.getElementById("day-one-timestamp").innerHTML = threet;
document.getElementById("day-one-timestamp").innerHTML = fourt;

function convert_time_format (time) { // edited from https://stackoverflow.com/questions/13898423/javascript-convert-24-hour-time-of-day-string-to-12-hour-time-with-am-pm-and-no 
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
}

function startTime() {
    var today = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var day = days[today.getDay()] 
    var month = months[today.getMonth()]
    var day_number = today.getDate()
    document.getElementById("date-p1").innerHTML = day;
    document.getElementById("date-p2").innerHTML = day_number + ' ' + month;
    if (config.time_format == 12) {
        document.getElementById("time").innerHTML = convert_time_format(today.getHours() + ":" + formatMins(today.getMinutes()));
    }else {
        document.getElementById("time").innerHTML = today.getHours() + ":" + formatMins(today.getMinutes());
    }
        document.getElementById("seconds").innerHTML = formatSeconds(today.getSeconds());
    var t = setTimeout(startTime, 1000);
}
function startWeather() {
    if (config.offline_mode != true) {
        var w = getWeather();
        weatherToIcon(w);
        formatWeather(m);   // for testing ↓
        var t = setTimeout(startWeather, 10000) //config.weather_refresh_rate);
    }
}
function formatMins(min) { // adds a zero before mins if the number is only one (eg 1 becomes 01)
    if (min < 10) { min = "0" + min}
    return min;
}

function formatSeconds(s) { // adds a zero before the seconds if the number is only one (eg 1 becomes 01)
    if (s < 10) { s = "0" + s}
    return s;
}

function formatWeather(weather) {
    var celcius = Math.round(parseFloat(d.main.temp)-273.15);
    var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32);
    let d =  new Date(weather.dt*1000);
    days = ["one", "two", "three", "four", "one", "two","three"];
    var day = days[d.getDay()];
    document.getElementById('temp-' +day).innerHTML = celcius + '&deg;';
    document.getElementById('wind-speed-'+day).innerHTML = weather.wind.speed + 'mph';
    weatherToIcon(weather.weather[0].main.toUpperCase());
}
function weatherToIcon(w) {
    let d =  new Date(w.dt*1000);
    days = ["one", "two", "three", "four", "one", "two","three"];
    var day = days[d.getDay()];
    if (w = "CLOUDS") {
        document.getElementById('icon'+day).innerHTML = '<ion-icon name="ios-cloud">';
    }else if (w = "RAINY") {
        document.getElementById('icon'+day).innerHTML = '<ion-icon name="ios-rainy">';
    } else if (w = "THUNDERSTORM") {
        document.getElementById('icon'+day).innerHTML = '<ion-icon name="ios-thunderstorm">';
    } else if (w = "SUNNY") {
        document.getElementById('icon'+day).innerHTML = '<ion-icon name="ios-sunny">';
    } else {
        document.getElementById('icon'+day).innerHTML = '<ion-icon name="ios-help">'
    }

}
function getWeather() {
    api_key = config.openweather_key;
    location1 = config.location;
    // Adapted from https://bytemaster.io/fetch-weather-openweathermap-api-javascript
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + location1 + '&appid=' + api_key)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .catch(function() {
      // catch any errors
    });

}

// for testing
function demoData() {
    var days = ["one", "two", "three", "four", "one", "two","three"];
    var i;
    var c = 24;
    let  w= 6;
    for (i = 0; i < 4; i++) {
        var day = days[i];
        document.getElementById('temp-' +day).innerHTML = c + '&deg;';
        console.log('temp-' + day);
        //document.getElementById('wind-speed-' +day).innerHTML = w + 'mph';
    }
}