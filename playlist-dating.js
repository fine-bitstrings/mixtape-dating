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
  // playlists[playlists.length-1].url = '/playlist/' + id;
  db.query(
    'call InsertPlaylist(?, ?);',
    [req.body.title, req.body.email],
    function(err, ids, _blah){ // ;)
      if(!err){
        for(var i=0; i<req.body.items.length; i++){
          db.query(
            'call InsertPlaylistItem(?, ?, ?);',
            [ids[0][0]['Id'], req.body.items[i].title, req.body.items[i].link], // already JSON parsed
            function(err, rows, fields){}
          );
        }
      }else{
        throw err;
      }
    }
  );
  
  // db.query(
    // 'call InsertPlaylist(?, ?);', 
    // [req.body]
  // res.send(JSON.stringify({id: id}));
});

app.get('/playlist/:id', function(req, res){
  var id = parseInt(req.params.id);
  db.query(
    'call MixtapeDating.GetPlaylistInfo(?)', 
    req.params.id, 
    function(err, info, fields){      
      db.query(
        'call MixtapeDating.GetPlaylist(?)',
        id,
        function(err, items, fields){
          res.render('playlist.ejs', {
            title: info[0][0]['Title'],
            email: info[0][0]['Email'],
            items: items[0].map(function(item){return {link: item['Link'], title: item['Title'] };})
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