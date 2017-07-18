USE MixtapeDating;

-- Tables
-- The Playlist table gets featured on the front page. 
CREATE TABLE Playlist (
	Id INT PRIMARY KEY AUTO_INCREMENT, 
	Title VARCHAR(255),
	Email VARCHAR(255),
	CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- The PlaylistItem gets featured at /playlist/:id
CREATE TABLE PlaylistItem (
	Id INT PRIMARY KEY AUTO_INCREMENT,
	PlaylistId INT, 
	Title VARCHAR(255),
	Link VARCHAR(255)
);

-- Stored Procedures
-- Insert playlist
CREATE PROCEDURE InsertPlaylist
(
	IN Title VARCHAR(255),
	IN Email VARCHAR(255),
	OUT PlaylistId INT
)
BEGIN
	INSERT INTO Playlist (Title, Email)
	VALUES (@Title, @Email);
	SELECT LAST_INSERT_ID() AS @PlaylistId;
END

CREATE PROCEDURE InsertPlaylistItem
(
	IN PlaylistId INT, 
	IN Title VARCHAR(255),
	IN Link VARCHAR(255)
)
BEGIN
	INSERT INTO PlaylistItem (PlaylistId, Title, Link)
	VALUES (@PlaylistId, @Title, @Link);
END

-- Fetch all playlists
CREATE PROCEDURE GetPlaylists
BEGIN
	SELECT Id, Title, Email 
	FROM Playlist;
END

-- Fetch all playlist items for a playlist
CREATE PROCEDURE GetPlaylist
(IN Id INT)
BEGIN
	SELECT PlaylistId, Id, Title, Link
	FROM PlaylistItem
	WHERE Id = @Id; 
END