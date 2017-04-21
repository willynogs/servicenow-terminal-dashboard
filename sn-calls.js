var request = require('request');
var config = require('./config');

var snCalls = {
  getMyWork: function(box, screen, cb){
    var options = {
      url: 'https://osuitsm.service-now.com/api/now/table/task?sysparm_query=active%3Dtrue%5Eassigned_to.user_name%3D' + config.sn_user + '&sysparm_display_value=true',
      headers: {
        authorization: 'Basic '+ new Buffer(config.sn_username +':'+ config.sn_password).toString('base64')
      }
    };
    /* get my work */
    request(options, function(e, r, b){
      if(e) console.log(e);
      var body = JSON.parse(b);
      var recs = body.result; /* array of records */
      var data = [];
      for(var x in recs){
        var id = [];
        id.push(recs[x].number);
        id.push(recs[x].state);
        id.push(recs[x].short_description);
        data.push(id);
      }
      box.setData({
        headers: ['number', 'state', 'description'],
        data: data
      });
      box.focus();
      screen.render();
      cb(recs);
    });
  },
  /* further calls will go here */
};

module.exports = snCalls;
