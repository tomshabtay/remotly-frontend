var express = require('express');
var app = express();

var handlebars = require('express-handlebars');
var formidable = require('formidable');
var credentials = require('./credentials.js');

//New Device
var func = require('./func');
newdevice = {};

app.disable('x-powered-by');
//Set handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine' , 'handlebars');

//Set port
app.set('port', process.env.PORT || 3000);

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


app.get('/contact' , function(req , res){
	res.render('contact' , {csrf: 'CSRF token here'});
});

app.get('/add-device' , function(req , res){
	res.render('add-device' , {csrf: 'CSRF token here'});
});

app.get('/thankyou' , function(req , res){
	res.render('thankyou');
});

app.post('/process' , function(req , res){
	console.log('Form: ' + req.query.form);
	console.log('CSRF token: ' + req.body._csrf);
	console.log('Email: ' + req.body.email);
	console.log('Q: ' + req.body.ques);
	res.redirect(303, '/thankyou');

	
});

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

	res.redirect(303, '/test');

	
});

app.use('/test' , func);

app.use(function(req , res){
	res.type('text/html');
	res.status(404);
	res.render('404');
});


app.listen(app.get('port') , function(){
	console.log("Express started...")

})