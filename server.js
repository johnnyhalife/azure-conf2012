var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
	return res.sendfile(__dirname + "/public/index.html");
});

app.post("/operations", function(req, res){
	var operations = req.body;

	res.end();
});


app.listen(process.env.PORT || 5000);