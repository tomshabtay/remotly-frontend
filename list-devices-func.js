const express = require('express');
const router = express.Router();
var http = require('http');

var devices = {

  "centos": {
    "name": "centos",
    "ip": "10.0.0.2",
  },
   "another-centos": {
    "name": "another-centos",
    "ip": "10.0.0.3"
  },
   "machine": {
    "name": "machine",
    "ip": "10.0.0.4"
  }
};

/* GET api listing. */
router.get('/', (req, res) => {

var messageFromServer = "";
var body = '';

var options = {
  host: 'localhost',
  port: 4567,
  path: "devices/list"
};

http.get(options, function(resp){
	//resp.setEncoding('json');

	resp.on('data', function(chunk){
    body += chunk;
    
  });

  resp.on('end', function(){
  var fbResponse = JSON.parse(body);
  res.render('devices' , fbResponse);
});
 	
}).on("error", function(e){
  console.log("Got error: " + e.message);
});
    
    
});





module.exports = router;