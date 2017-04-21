/* require */
var blessed = require('blessed');
var contrib = require('blessed-contrib');
var request = require('request');
var weather = require('weather-js');
var sn = require('./sn-calls');

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

/* info box */
var infoBox = grid.set(0, 8, 1, 4, blessed.box, {
  label: 'info',
  content: 'last updated ... - v1.0'
});

/* weather box */
var weatherBox = grid.set(1, 8, 1, 4, blessed.box, {
  label: '☁️  weather ☁️',
  content: '[weather]'
});

/* quote box */
var quoteBox = grid.set(2, 8, 2, 4, blessed.box, {
  label: 'quote',
  content: '[quote]'
});

/* my work box */
var workBox = grid.set(0, 0, 4, 8, contrib.table, {
  keys: true,
  fg: 'white',
  selectedFg: 'white',
  selectedBg: 'blue',
  interactive: true,
  label: '💪  my work 💪',
  columnSpacing: 10 /*in chars*/,
  columnWidth: [16, 30, 60] /*in chars*/
});

/* call loop, then every 10 seconds call loop */
loop();
setInterval(loop, 10000);

/* call quote, then call quote every 30 seconds */
quote();
setInterval(quote, 30000);

/* functions */

/* repeating function */
function loop(){
  /* set info */
  setInfo();
  /* get the weather */
  getWeather('Columbus, Ohio');
  /* get my work from servicenow */
  sn.getMyWork(workBox, screen);
}

function setInfo(){
  var d = new Date();
  var updated = ('0' + (d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2) + '/' + d.getFullYear() + ' @ ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2);
  infoBox.content = 'last updated ' + updated + ' - v1.0';
  screen.render();
}

function getWeather(location){
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
}

/* get our quote */
function quote(){
  var options = {
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous',
    headers: {
      'X-Mashape-Key': 'eN5shPYkKomshlsWJx6JrZ2LFf9Np13GdOhjsnIPetFn8juXSR',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    }
  };
  request(options, function(e, r, b){
    var json = JSON.parse(b);
    quoteBox.content = json.quote + '\n- ' + json.author;
    screen.render();
  });
}
