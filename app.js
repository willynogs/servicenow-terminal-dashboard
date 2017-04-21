/* require */
var blessed = require('blessed');
var contrib = require('blessed-contrib');
var open = require('open');
var config = require('./config');
var sn = require('./sn-calls');
var weather = require('./weather');
var quote = require('./quote');

/* create screen object */
var screen = blessed.screen({
  fullUnicode: true,
  autoPadding: true,
  smartCSR: true,
  title: 'sn dash'
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
  content: 'last updated ... - v' + config.version
});

/* weather box */
var weatherBox = grid.set(1, 8, 1, 4, blessed.box, {
  label: '☁️  weather ☁️',
  content: '[weather]'
});

/* quote box */
var quoteBox = grid.set(2, 8, 2, 4, blessed.box, {
  label: '💭  quote 💭',
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

/* handle select on rows */
var work_rows = [];
workBox.rows.on('select', function(item, index){
  open('https://osuitsm.service-now.com/task.do?sys_id=' + work_rows[index].sys_id);
});

/* ----- set intervals ----- */

/* call sn, then on interval call sn */
getSN();
setInterval(getSN, config.sn_frequency);

/* call weather, then call weather on interval */
weather.getWeather(config.city, weatherBox, screen);
setInterval(getWeather, config.weather_frequency);

/* call quote, then call quote on interval */
getQuote();
setInterval(getQuote, config.quotes_frequency);

/* ----- repeating functions ----- */

function getSN(){
  /* get my work from servicenow */
  sn.getMyWork(workBox, screen, function(recs){
    work_rows = recs;
  });
  /* set info */
  setInfo();
}

function getWeather(){
  /* get the weather */
  weather.getWeather(config.city, weatherBox, screen);
  /* set info */
  setInfo();
}

function getQuote(){
  /* get a quote */
  quote.getQuote(quoteBox, screen);
  /* set info */
  setInfo();
}

/* run this anytime we update the dashboard */
function setInfo(){
  var d = new Date();
  var updated = ('0' + (d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2) + '/' + d.getFullYear() + ' @ ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2);
  infoBox.content = 'last updated ' + updated + ' - v' + config.version;
  screen.render();
}
