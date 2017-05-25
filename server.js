var express = require('express');

var app = express();

var func = require('./func');

app.disable('x-powered-by');

var handlebars = require('express-handlebars');

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine' , 'handlebars');


app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));
app.use(require('body-parser').urlencoded({
	extended: true}));
var formidable = require('formidable');

var credentials = require('./credentials.js');
app.use(require('cookie-parser')(credentials.cookieSecret));

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

app.use('/test' , func);

app.use(function(req , res){
	res.type('text/html');
	res.status(404);
	res.render('404');
});


app.listen(app.get('port') , function(){
	console.log("Express started...")

})