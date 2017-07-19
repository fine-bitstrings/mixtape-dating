create definer=`mixtape-dating`@`%` procedure `InsertPlaylistItem`(
	in PlaylistId int, 
	in Title varchar(255),
	in Link varcgar(255)
)
begin
	insert into PlaylistItem (PlaylistId, Title, Link)
	values (@PlaylistId, @Title, @Link);
end