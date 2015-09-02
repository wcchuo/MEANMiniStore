var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(path.join(__dirname, './client')));
app.use(bodyParser.json());
app.listen(8014, function() {
  console.log('Server runs on: 8014');
});

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);


