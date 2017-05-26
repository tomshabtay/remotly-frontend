const express = require('express');
const router = express.Router();
var http = require('http');


/* GET api listing. */
router.get('/:name', (req, res) => {

var body = '';

var options = {
  host: 'localhost',
  port: 4567,
  path: "devices/" + req.params.name + "/details"
};

http.get(options, function(resp){
	resp.setEncoding();

	resp.on('data', function(chunk){
		body += chunk;
		var fbResponse = JSON.parse(body);
    console.log(options.path);
    console.log(chunk);
  		res.render('device-details' , fbResponse);
 	});
 	
}).on("error", function(e){
  console.log("Got error: " + e.message);
});
    
    
});





module.exports = router;