var express = require('express'),
		mongoskin = require('mongoskin');

db = mongoskin.db(process.env.MONGOLAB_URI || "mongodb://127.0.0.1:27017/poorly?auto_reconnect=true&poolSize=20", {safe: true});

var app = express();

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

app.configure('production', function(){
	app.use(require('azure-logstreamer'));
});

app.post("/operations", function(req, res) {
	var clause = createOperationGroup(req.body);

	db.collection('murals').update({id: 'm'}, clause, function(err){
		res.send();	
	});	
});

function propertyToWhere(operation) {
	return ['widgets', operation.id, operation.propertyName].join('.');
}

function createOperationGroup(operations) {
	var clause = {'': {}};
	
	operations.forEach(function(operation){
		clause[''][propertyToWhere(operation)] = operation.propertyValue;
	});

	return clause;
}

app.listen(process.env.PORT || 5000);