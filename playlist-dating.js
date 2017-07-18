'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './client');

var playlists = [];


app.use('/client', express.static('client'));
app.use(bodyParser.json());
app.use(express.static('views'));

app.get('/', function(req, res){
  res.render('index.ejs', {playlists: playlists});
});

app.post('/create-playlist/', function(req, res){
  playlists.push(req.body);
  var id = (playlists.length-1).toString();
  playlists[playlists.length-1].url = '/playlist/' + id;
  res.send(JSON.stringify({id: id}));
});

app.get('/playlist/:id', function(req, res){
  console.log('playlist/' + req.params.id, playlists[req.params.id]);
  res.render('playlist.ejs', {playlist: playlists[req.params.id]});
});



var PORT = 16000
app.listen(PORT, function(){
  console.log('App Playlist Dating listening on port ' + PORT);
});

/* Thanks to:
https://codeforgeek.com/2014/09/handle-get-post-request-express-4/
http://regexr.com/
https://stackoverflow.com/questions/22952044/loop-through-json-in-ejs
https://www.html5rocks.com/en/tutorials/file/xhr2/
https://expressjs.com/en/guide/routing.html

*/