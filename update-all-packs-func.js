const express = require('express');
const router = express.Router();
var http = require('http');


/* GET api listing. */
router.get('/:name', (req, res) => {

var body = '';

var options = {
  host: 'localhost',
  port: 4567,
  path: "ssh/" + req.params.name + "/updateall"
};

var msg = {
  msg :'Packs Updated.'
};
http.get(options, function(resp){
	resp.setEncoding();

	resp.on('data', function(chunk){
		body += chunk;
		//var fbResponse = JSON.parse(body);
    console.log(options.path);
  		
 	});
 	
}).on("error", function(e){
  console.log("Got error: " + e.message);
});
    res.render('msg' , msg);
    
});





module.exports = router;