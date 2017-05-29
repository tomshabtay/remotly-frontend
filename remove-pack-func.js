const express = require('express');
const router = express.Router();
var http = require('http');


/* GET api listing. */
router.get('/:name/:pack', (req, res) => {

var body = '';

var options = {
  host: 'localhost',
  port: 4567,
  path: "ssh/" + req.params.name + "/remove/" + req.params.pack
};

var msg = {
  msg :'Package Removed.'
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