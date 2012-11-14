var express = require('express'),
		mongoskin = require('mongoskin');

db = mongoskin.db(process.env.MONGOLAB_URI || "mongodb://127.0.0.1:27017/poorly?auto_reconnect=true&poolSize=20", {safe: true});

var app = express();

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

app.post("/operations", function(req, res) {
	console.log("received operations");
	res.end();
});

app.listen(process.env.PORT || 5000);