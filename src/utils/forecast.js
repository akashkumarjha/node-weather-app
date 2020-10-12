const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&units=metric&appid=a9302094649aaddba459777965aeaa94";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to Connect Weather Server", undefined);
    } else if (body.cod) {
      callback("Unable to Fetch your Weather", undefined);
    } else {
      callback(undefined, body.current.temp);
    }
  });
};

module.exports = forecast;
