var express = require('express');
var app = express();
app.get('/html', function (req, res) {

	res.send('html');
});
app.use(express.static('tcb'));

app.listen(3000,function(){
	console.log("tcb已抵达3000端口...");
});


