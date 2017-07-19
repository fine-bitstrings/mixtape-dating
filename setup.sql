drop schema MixtapeDating;
create schema MixtapeDating;
use MixtapeDating;

/* Tables */
/* The Playlist table gets featured on the front page. */
create table if not exists Playlist (
	Id int primary key AUTO_inCREMENT, 
	Title varchar(255),
	Email varchar(255),
	CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* The PlaylistItem gets featured at /playlist/:id */
create table if not exists PlaylistItem (
	Id int primary key AUTO_inCREMENT,
	PlaylistId int, 
	Title varchar(255),
	Link varchar(255)
);

/* Stored Procedures */
/* insert playlist */
delimiter //
create procedure MixtapeDating.InsertPlaylist
(
	in Title varchar(255),
	in Email varchar(255)
)
begin
	insert into 
		Playlist (Title, Email) 
  values
		(_Title, _Email);
    
	select last_insert_id() as Id;
end //
delimiter ;

delimiter //
create procedure MixtapeDating.InsertPlaylistItem
(
	in _PlaylistId int, 
	in _Title varchar(255),
	in _Link varchar(255)
)
begin
	insert intO PlaylistItem (PlaylistId, Title, Link)
	values (_PlaylistId, _Title, _Link);
end //
delimiter ;

/* Fetch all playlists */
delimiter //
create procedure MixtapeDating.GetPlaylists
()
begin
	select Id, Title, Email 
	from Playlist;
end //
delimiter ;

/* Fetch all playlist items for a playlist */
delimiter //
create procedure MixtapeDating.GetPlaylist
(
	in _Id int
)
begin
	select Id, Title, Link
	from PlaylistItem
	where PlaylistId = _Id; 
end //
delimiter ;

delimiter //
create procedure MixtapeDating.GetPlaylistInfo
(
  in _Id int
)
begin
  select Title, Email
  from Playlist
  where Id = _Id;
end //
delimiter ;

/* Degugging Data */
INSERT INTO Playlist (Title, Email) VALUES ('For You!', 'moorej30@unlv.nevada.edu');

INSERT INTO PlaylistItem (PlaylistId, Title, Link) 
VALUES 
(1, 'Regina Spektor - Dance Anthem of the 80s', 'https://www.youtube.com/watch?v=8zd0RZusvJk'), 
(1, 'Regina Spektor - How', 'https://www.youtube.com/watch?v=7mBfW-CdgLE');
