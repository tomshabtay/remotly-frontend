const express = require('express');
const router = express.Router();
var http = require('http');

/* GET api listing. */
router.get('/', (req, res) => {

var messageFromServer = "";

var options = {
  host: 'localhost',
  port: 4567,
  path: "devices/list"
};

http.get(options, function(resp){
	resp.setEncoding('utf8');
	resp.on('data', function(chunk){
  res.render('devices' , {
    content:'hello content'
  });
 	});
 	
}).on("error", function(e){
  console.log("Got error: " + e.message);
});
    
    
});





module.exports = router;