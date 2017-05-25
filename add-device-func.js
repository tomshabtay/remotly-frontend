const express = require('express');
const router = express.Router();
var http = require('http');

/* GET api listing. */
router.get('/', (req, res) => {

var messageFromServer = ""; 

var options = {
  host: 'localhost',
  port: 4567,
  path: 'devices/add/name=' + newdevice.name + 
  		'&password=' + newdevice.password + 
  		'&ip=' + newdevice.ip + 
  		'&username=' + newdevice.username
};

http.get(options, function(resp){
	resp.setEncoding('utf8');
	resp.on('data', function(chunk){

	 messageFromServer = chunk;
  if(messageFromServer === 'success'){
    res.redirect(303, '/device-added-success');
  }else{
    res.redirect(303, '/device-added-fail');
  }

 	});
 	
}).on("error", function(e){
  console.log("Got error: " + e.message);
});
    
    //res.send("");
});





module.exports = router;