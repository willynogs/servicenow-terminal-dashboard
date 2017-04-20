/* require */
var blessed = require('blessed');
var contrib = require('blessed-contrib');
var weather = require('weather-js');

/* create screen object */
var screen = blessed.screen({
  fullUnicode: true,
  autoPadding: true,
  smartCSR: true,
  title: 'nog dash'
});

/* <3 */
screen.title = 'nog dash';

var grid = new contrib.grid({rows: 12, cols: 12, screen: screen});
var weatherBox = grid.set(0, 0, 6, 6, blessed.box, {
  content: '[weather]',
  label: '☁️  weather ☁️'
});

/* quit on escape, q, or control-c */
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

/* get the weather */
getWeather('Columbus, Ohio');

/* functions */
function getWeather(location){
  weather.find({ search: location, degreeType: 'F' }, function(err, res){
    if(err) { console.log(e); }
    var c = res[0];
    var city = c.location.name;
    var temp = c.current.temperature;
    var weatherString = temp + '° F in ' + city;
    //console.log(weatherString);
    /* update the weather box */
    weatherBox.content = weatherString;
    screen.render();
  });
}
