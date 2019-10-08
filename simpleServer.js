var express = require('express'),
app = express(),
port = process.env.PORT || 4000;
// console.log('your site is running at port: ', port);
app.use(express.static(__dirname + '/src'));
app.listen(port);
