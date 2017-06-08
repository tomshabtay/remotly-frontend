var express = require('express');
var app = express();

var handlebars = require('express-handlebars');
var formidable = require('formidable');
var credentials = require('./credentials.js');

//New Device
var add_device_func = require('./add-device-func');
newdevice = {};

//List Device
var list_devices_func = require('./list-devices-func');

//Device Details
var details_device_func = require('./details-device-func');

//Remove Device
var remove_device_func = require('./remove-device-func');

//Update Package
var update_pack_func = require('./update-pack-func');

//Update All Packages
var update_all_packs_func = require('./update-all-packs-func');

//Remove Package
var remove_pack_func = require('./remove-pack-func');

//Add Package
var add_pack_func = require('./add-pack-func');

//Update All
var update_all_func = require('./update-all-func');

//Install Pack On All
var install_all_func = require('./install-all-func');

//SSH
var ssh_func = require('./ssh-func');

app.disable('x-powered-by');
//Set handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine' , 'handlebars');

//Set port
//app.set('port', process.env.PORT || 3000);
const PORT = 8080;

//Set public dir
app.use(express.static(__dirname + '/public'));

//Use Body Phraser
app.use(require('body-parser').urlencoded({
	extended: true}));


app.use(require('cookie-parser')(credentials.cookieSecret));

//*********
// Routes
//*********

app.get('/',function(req , res){
	res.render('home');
});

app.use(function( req, res, next){
	console.log("Looking for URL:" + req.url);
	next();
});

app.get('/about',function(req , res){
	res.render('about');
});

//Add Device
app.get('/add-device' , function(req , res){
	res.render('add-device' , {csrf: 'CSRF token here'});
});


app.get('/device-added-success',function(req , res){
	res.render('device-added-success');
});

app.get('/device-added-fail',function(req , res){
	res.render('device-added-fail');
});
//Form process add device
app.post('/process-add-device' , function(req , res){
	console.log('what: ' + req.query.form);
	console.log('Name: ' + req.body.name);
	console.log('Ip: ' + req.body.ip);
	console.log('Username: ' + req.body.username);
	console.log('Password: ' + req.body.password);
	
	newdevice.name = req.body.name;
	newdevice.password = req.body.password;
	newdevice.username = req.body.username;
	newdevice.ip = req.body.ip;

	res.redirect(303, '/add-device-func');

});

//Form process add pack
app.post('/process-add-pack/:name' , function(req , res){
	console.log('what: ' + req.query.form);
	console.log('Pack: ' + req.body.pack);
	console.log('OS: ' + req.params.name);

	res.redirect(303, '/add-pack-func/' + 
		req.params.name + '/' +
		req.body.pack
		);

});
app.use('/add-device-func' , add_device_func);

//Devices List
app.use('/devices' , list_devices_func);

//Device Details
app.use('/details/' , details_device_func);

//Remove Device
app.use('/remove/' , remove_device_func);

//Remove Package
app.use('/remove-pack/' , remove_pack_func);

//Add Package
app.use('/add-pack-func/' , add_pack_func);

//Update All Packages
app.use('/update-all-packs-func/' , update_all_packs_func);

//Update Pack
app.use('/update-pack/', update_pack_func);

//SSH
app.use('/ssh/' , ssh_func);

//Update All
app.use('/update-all-devices-func' , update_all_func);

//Install On All
app.use('/install-all-func' , install_all_func);



app.use(function(req , res){
	res.type('text/html');
	res.status(404);
	res.render('404');
});


app.listen(PORT, "0.0.0.0");
console.log('Running on http://localhost:' + PORT);