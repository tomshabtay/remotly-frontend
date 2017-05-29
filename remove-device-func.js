const express = require('express');
const router = express.Router();
var http = require('http');


/* GET api listing. */
router.get('/:name', (req, res) => {

var body = '';

var options = {
  host: 'localhost',
  port: 4567,
  path: "devices/" + req.params.name + "/delete"
};

var msg = {
  msg :'Device Removed.'
};
http.get(options, function(resp){
	resp.setEncoding();

	resp.on('data', function(chunk){
		body += chunk;
		//var fbResponse = JSON.parse(body);
    console.log(options.path);
  		res.render('msg' , msg);
 	});
 	
}).on("error", function(e){
  console.log("Got error: " + e.message);
});
    
    
});





module.exports = router;