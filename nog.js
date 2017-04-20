/* require */
var blessed = require('blessed');
var contrib = require('blessed-contrib');
var request = require('request');
var weather = require('weather-js');

/* create screen object */
var screen = blessed.screen({
  fullUnicode: true,
  autoPadding: true,
  smartCSR: true,
  title: 'nog dash'
});

/* quit on escape, q, or control-c */
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

/* 12 x 12 grid system */
var grid = new contrib.grid({rows: 12, cols: 12, screen: screen});

/* weather box */
var weatherBox = grid.set(0, 6, 2, 6, blessed.box, {
  label: '☁️  weather ☁️',
  content: '[weather]'
});

/* servicenow box */
var servicenowBox = grid.set(6, 0, 6, 12, blessed.box, {
  label: 'servicenow',
  content: 'content'
});

/* every 10 seconds call loop */
setTimeout(loop, 10000);

/* repeating function */
function loop(){
  /* get the weather */
  getWeather('Columbus, Ohio');
  /* get info from servicenow */
  getSNData();
}

/* functions */
function getWeather(location){
  weather.find({ search: location, degreeType: 'F' }, function(err, res){
    if(err) { console.log(e); }
    var c = res[0];
    var city = c.location.name;
    var temp = c.current.temperature;
    var weatherString = temp + '° F in ' + city;

    /* update the weather box */
    weatherBox.content = weatherString;
    screen.render();
  });
}

function getSNData(){

}
