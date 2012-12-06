var express = require('express'),
		mongoskin = require('mongoskin');

db = mongoskin.db(process.env.MONGOLAB_URI || "mongodb://127.0.0.1:27017/poorly?auto_reconnect=true&poolSize=20", {safe: true});

var app = express();

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

app.get("/murals/:mural", function(req, res){
	db.collection('murals').findOne({id: req.params.mural}, function(err, m){
		res.send(m);
	});
});

// here goes the fun part 
app.post("/operations", function(req, res){
	var operations = req.body;
	var clause = createOperationGroup(operations);

	db.collection('murals').update({id: 'm'}, clause, function(err){
		// do error handling 
		console.log("Operation successfuly sent to the database");
		res.end();
	});	
});

function createOperationGroup(operations) {
	var clause = {'$set': {}};
	
	operations.forEach(function(operation){
		clause['$set'][propertyToWhere(operation)] = operation.propertyValue;
	});

	return clause;
}

function propertyToWhere(operation) {
	return ['widgets', operation.id, operation.propertyName].join('.');
}

app.listen(process.env.PORT || 5000);
console.log("[%s] poor.ly running on %s", new Date(), process.env.PORT || 5000);