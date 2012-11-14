var express = require('express');

var app = express();

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

// here goes the fun part


app.listen(process.env.PORT || 5000);
console.log("[%s] poor.ly running on %s", new Date(), process.env.PORT || 5000);