var request = require('request');
var config = require('./config');

var quotesCalls = {
  getQuote: function(quoteBox, screen){
    var options = {
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=' + config.quotes_cat,
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
};

module.exports = quotesCalls;
