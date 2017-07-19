'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mysql = require('mysql');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'mixtape-dating',
  password: 'mypublicpassword',
  database: 'MixtapeDating'
});

db.connect();

const app = express();

app.set('view engine', 'ejs');
app.set('views', './client');

var playlists = [];


app.use('/client', express.static('client'));
app.use(bodyParser.json());
app.use(express.static('views'));

app.get('/', function(req, res){
  console.log('get / routed...')
  var playlists = [];
  db.query('call GetPlaylists()', [], function(err, rows, fields){
    console.log('call GetPlaylist:', err, rows, fields);
    playlists = [];
    
    for(var i=0; i<rows.length; i++){
      playlists.push({title: rows[i].Title, email: rows[i].Email});
    }
    
    res.render('index.ejs', {playlists: playlists});
  });
  
  console.log('/ rendering...')
});

app.post('/create-playlist/', function(req, res){
  console.log('post /create-playlist/');
  playlists.push(req.body);
  var id = (playlists.length-1).toString();
  playlists[playlists.length-1].url = '/playlist/' + id;
  res.send(JSON.stringify({id: id}));
  
  var r = db.query(
    'call InsertPlaylist (?, ?);', 
    [req.body.title, req.body.email],
    function(err, rows, fields){
      console.log(err, rows, fields);
      var id = rows[0]['Id'];
      
      for(var i=0; i<req.body.playlist.length; i++){
        db.query(
          'call InsertPlaylistItem (?, ?, ?);',
          [id, req.body.playlist[i].title, req.body.playlist[i].link],
          function(err, rows, fields){
            console.log('InsertPlaylistItem called');
          }
        );        
      }

      
    }
  );
});

app.get('/playlist/:id', function(req, res){
  console.log('get /playlist/:id')
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