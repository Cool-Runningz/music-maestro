export type Recommendation = {
	artist: string;
	song: string;
};

export type SimplifiedTrack = {
	uri: SpotifyApi.TrackObjectSimplified["uri"];
	image: SpotifyApi.TrackObjectFull["album"]["images"][2];
	song: SpotifyApi.TrackObjectSimplified["name"];
	artist: SpotifyApi.TrackObjectSimplified["artists"][0]["name"];
};
