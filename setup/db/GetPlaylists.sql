CREATE DEFINER=`mixtape-dating`@`%` PROCEDURE `GetPlaylists`()
begin
	select Id, Title, Email 
	from Playlist;
end