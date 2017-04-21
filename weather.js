var weather = require('weather-js');

var weatherCalls = {
  getWeather: function(location, weatherBox, screen){
    weather.find({ search: location, degreeType: 'F' }, function(err, res){
      if(err) { console.log(e); }
      var c = res[0];
      var city = c.location.name;
      var temp = c.current.temperature;
      var skytext = c.current.skytext;
      var weatherString = 'it is currently ' + temp + '° F and ' + skytext + ' in ' + city;

      /* update the weather box */
      weatherBox.content = weatherString;
      screen.render();
    });
  },
  /* other weather calls can go here */
};

module.exports = weatherCalls;
