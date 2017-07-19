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
		(@Title, @Email);
	select last_insert_id() as Id;
end //
delimiter ;

delimiter //
create procedure MixtapeDating.InsertPlaylistItem
(
	in PlaylistId int, 
	in Title varchar(255),
	in Link varchar(255)
)
begin
	insert intO PlaylistItem (PlaylistId, Title, Link)
	values (@PlaylistId, @Title, @Link);
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
	in Id int
)
begin
	select PlaylistId, Id, Title, Link
	from PlaylistItem
	where Id = @Id; 
end //
delimiter ;