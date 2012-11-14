var express = require('express');

var app = express();

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 5000);
console.log("[%s] poor.ly running on %s", new Date(), process.env.PORT || 5000);