var express = require('express');

var app = express();

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

app.configure('production', function(){
	app.use(require('azure-logstreamer'));
});

app.post("/operations", function(req, res) {
	console.log("received operations");
	res.end();
});

app.listen(process.env.PORT || 5000);