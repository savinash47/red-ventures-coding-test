var express = require('express');
var app = express();
var http = require('http');
var PORT = "5000";
var path = require('path');

app.use('/public',express.static(path.join(__dirname,'/public')));

app.get('/*', function(req, res, next){
  if (req.accepts('text/html')) res.sendFile(path.join(__dirname,'public/index.html'));
  else next()
});

var server = http.createServer(app);

app.set('port',  process.env.PORT || PORT);

server.listen(app.get('port'),function(error){
	if(error){
		console.log(error.toString());
	}
	console.log('Server started: Listening on port ' + PORT);
});