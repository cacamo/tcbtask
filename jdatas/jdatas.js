var express = require('express');
var fs = require('fs');
var app = express();
var bufferData = [];
fs.readFile("data/1.json",function(err,data){
	bufferData.push(data);
});
fs.readFile("data/2.json",function(err,data){
	bufferData.push(data);
});
fs.readFile("data/3.json",function(err,data){
	bufferData.push(data);
	app.listen(3300,function(){
		console.log("端口3300服务已启动...");
	});
});


app.get('/datas/:count',(req,res,next) => {
	var count = req.params.count - 1;
	res.set('Content-type','application/json');
	if(count<3){
		
		res.send(bufferData[count]);
	}
});