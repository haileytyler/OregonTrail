// Weather object
function weather(id, type, healthChange, mileChange, probability) {
    this.id = id; // integer id used to identify it
    this.type = type; // type of weather
    this.healthChange = healthChange; // amount of health the weather affects daily
    this.mileChange = mileChange; // precentage of pace player can cover in this weather type
    this.probability = probability; // the chance of getting this weather on any given day
}

// Weather (static):
function createWeather(id, type, healthChange, mileChange, probability) {
    return new weather(id, type, healthChange, mileChange, probability);
}

exports.weatherList = [];

var veryHot = createWeather(1, 'Very Hot', -8, 0.7, 0.1);
var hot = createWeather(2, 'Hot', -3, 0.9, 0.1);
var warm = createWeather(3, 'Warm', 1, 1, 0.2);
var cool = createWeather(4, 'Cool', 1, 0.95, 0.1);
var cold = createWeather(5, 'Cold', -5, 0.8, 0.1);
var veryCold = createWeather(6, 'Very Cold', -12, 0.7, 0.1);
var rain = createWeather(7, 'Rain', -4, 0.6, 0.1);
var heavyRain = createWeather(8, 'Heavy Rain', -8, 0.4, 0.05);
var snow =  createWeather(9, 'Snow', -15, 0.3, 0.05);
var blizzard = createWeather(10, 'Blizzard', -30, 0.1, 0.05);
var heavyFog = createWeather(11, 'Heavy Fog', -3, 0.5, 0.05);

exports.weatherList.push(veryHot);
exports.weatherList.push(hot);
exports.weatherList.push(warm);
exports.weatherList.push(cool);
exports.weatherList.push(cold);
exports.weatherList.push(veryCold);
exports.weatherList.push(rain);
exports.weatherList.push(heavyRain);
exports.weatherList.push(snow);
exports.weatherList.push(blizzard);
exports.weatherList.push(heavyFog);
