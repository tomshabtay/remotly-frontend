const express = require('express');
const router = express.Router();
var http = require('http');


/* GET api listing. */
router.get('/:name/:command', (req, res) => {

var body = '';

var options = {
  host: 'localhost',
  port: 4567,
  path: "ssh/do/" + req.params.name + "/" + req.params.command
};

var msg = {
  msg :'SSH.'
};
http.get(options, function(resp){
	resp.setEncoding();

	resp.on('data', function(chunk){
		body += chunk;
    console.log(options.path);
		//var fbResponse = JSON.parse(body);
    console.log(body);
    res.render('msg' , msg);
  		
 	});
 	
}).on("error", function(e){
  console.log("Got error: " + e.message);
});
    
    
});





module.exports = router;