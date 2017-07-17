'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.get('/', function(req, res){
  res.send('Hello, Worlds!');
});

app.use('/client', express.static('client'));
app.use(bodyParser.json());

app.post('/create-playlist', function(req, res){
  console.log(req.body.title);
  console.log(req.body.playlist);
  console.log(req.body.email);
  res.send();
});


var PORT = 16000
app.listen(PORT, function(){
  console.log('App Playlist Dating listening on port ' + PORT);
});