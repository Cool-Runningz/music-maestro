import { useEffect, useState } from "react";
import { Player, Track } from "@/types/spotify.types";

export default function useSpotifyWebPlayback(accessToken: string) {
	const [player, setPlayer] = useState<Player>();
	const [deviceId, setDeviceId] = useState("");
	const [currentTrack, setCurrentTrack] = useState<Track>();
	const [isActive, setIsActive] = useState(false); //indicates whether the current playback has been transferred to this player or not.
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		if (accessToken) {
			const script = document.createElement("script");
			script.src = "https://sdk.scdn.co/spotify-player.js";
			script.async = true;

			document.body.appendChild(script);

			window.onSpotifyWebPlaybackSDKReady = () => {
				const player = new Spotify.Player({
					name: "Music Maestro Web Player",
					getOAuthToken: (cb) => {
						cb(accessToken);
					},
				});
				//console.log("player: ", player);
				setPlayer(player);

				player.addListener("ready", ({ device_id }) => {
					console.log("Ready with Device ID", device_id);
					setDeviceId(device_id);
				});

				player.addListener("not_ready", ({ device_id }) => {
					console.log("Device ID has gone offline", device_id);
				});

				player.addListener("player_state_changed", (state) => {
					if (!state) {
						return;
					}

					console.log(
						"state.track_window.current_track: ",
						state.track_window.current_track,
					);
					//console.log("state: ", state);
					setCurrentTrack(state.track_window.current_track);
					setIsPlaying(!state.paused);

					player?.getCurrentState?.()?.then((state) => {
						console.log("getCurrentState() ", state);
						!state ? setIsActive(false) : setIsActive(true);
					});
				});

				player.connect();
			};
		}
	}, [accessToken]);

	return {
		player,
		deviceId,
		currentTrack,
		isActive,
		isPlaying,
		setIsPlaying,
	};
}
