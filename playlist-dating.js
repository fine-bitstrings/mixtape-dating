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

// var playlists = [];


app.use('/client', express.static('client'));
app.use(bodyParser.json());
app.use(express.static('views'));

var HOST = 'http://localhost:16000';
app.get('/', function(req, res){
  var playlists = [];
  db.query('call GetPlaylists()', [], function(err, rows, fields){
    playlists = [];
    
    for(var i=0; i<rows[0].length; i++){
      playlists.push({
        id: rows[0][i]['Id'], 
        url: HOST + '/playlist/' + rows[0][i]['Id'], 
        title: rows[0][i]['Title'], 
        email: rows[0][i]['Email']
       });
    }

    res.render('index.ejs', {playlists: playlists});
  });
});

app.post('/create-playlist/', function(req, res){
  // playlists.push(req.body);
  var id = (playlists.length-1).toString();
  playlists[playlists.length-1].url = '/playlist/' + id;
  res.send(JSON.stringify({id: id}));
  
  var r = db.query(
    'call InsertPlaylist (?, ?);', 
    [req.body.title, req.body.email],
    function(err, rows, fields){
      var id = parseInt(rows[0]['Id']);
      
      for(var i=0; i<req.body.playlist.length; i++){
        db.query(
          'call InsertPlaylistItem (?, ?, ?);',
          [id, req.body.playlist[i].title, req.body.playlist[i].link],
          function(err, rows, fields){
            return 0;
          }
        );        
      }
    }
  );
});

app.get('/playlist/:id', function(req, res){
  db.query(
    'call GetPlaylistInfo(?);', 
    req.params.id, 
    function(err, playlistinfo, fields){
      db.query(
        'call GetPlaylist(?);',
        req.params.id,
        function(err, playlistitems, fields){
          // console.log('call GetPlaylist:', err, playlistitems, fields)
          var title = playlistinfo[0]['Title'];
          var email = playlistinfo[0]['Email'];
          var items = playlistitems[0].map(function(item){return {link: item['Link'], title: item['Title'] };});
          
          console.log(playlistitems);
          
          res.render('playlist.ejs', {
            title: title,
            email: email,
            items: items
          });
        }
      );
    }
  );
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