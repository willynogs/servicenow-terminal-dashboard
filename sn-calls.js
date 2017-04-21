var request = require('request');

var snCalls = {
  getMyWork: function(box, screen){
    var options = {
      url: 'https://osuitsm.service-now.com/api/now/table/task?sysparm_query=active%3Dtrue%5Eassigned_to.user_name%3Dnaugle.13&sysparm_display_value=true',
      headers: {
        authorization: 'Basic '+ new Buffer('naugle.13'+':'+'bettelweib').toString('base64')
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
    });
  },
  /* further calls will go here */
};

module.exports = snCalls;
