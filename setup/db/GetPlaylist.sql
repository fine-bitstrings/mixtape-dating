CREATE DEFINER=`mixtape-dating`@`%` PROCEDURE `GetPlaylist`(
	in Id int
)
begin
	select PlaylistId, Id, Title, Link
	from PlaylistItem
	where Id = @Id; 
end