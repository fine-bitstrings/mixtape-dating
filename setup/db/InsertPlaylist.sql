create definer=`mixtape-dating`@`%` procedure `InsertPlaylist`(
	in Title varchar(255),
	in Email varchar(255)
)
begin
	insert into 
		Playlist (Title, Email) 
    values
		(@Title, @Email);
        
	select last_insert_id() as Id;
end