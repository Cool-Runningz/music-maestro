"use client";
import React, { useState, useEffect } from "react";
import { Player, Track } from "@/types/spotify.types";
import { PlayIcon, PauseIcon } from "@heroicons/react/16/solid";
import { Avatar } from "@/components/catalyst/avatar";
import { useMusic } from "@/contexts/MusicContext";

const track = {
	name: "",
	album: {
		images: [{ url: "" }],
	},
	artists: [{ name: "" }],
};

const filterSpotifyResponses = (responses) => {
	return responses.flatMap((response) =>
		response.tracks.items.map((item) => {
			//console.log("item: ", item);
			return {
				uri: item?.uri,
				image: item?.album?.images?.[2],
				song: item?.name,
				artist: item?.artists?.[0]?.name,
			};
		}),
	);
};

export default function WebPlayback({ accessToken }: { accessToken: string }) {
	//Context
	const { tracks } = useMusic();

	//State
	const [isPaused, setIsPaused] = useState(false);
	const [isActive, setIsActive] = useState(false);
	const [player, setPlayer] = useState<Player>();
	const [currentTrack, setTrack] = useState<Track>();
	const [deviceId, setDeviceId] = useState("");

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://sdk.scdn.co/spotify-player.js";
		script.async = true;

		document.body.appendChild(script);

		window.onSpotifyWebPlaybackSDKReady = () => {
			const player = new window.Spotify.Player({
				name: "Music Maestro Web Player",
				getOAuthToken: (cb) => {
					cb(accessToken);
				},
				volume: 0.5,
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
				setTrack(state.track_window.current_track);
				setIsPaused(state.paused);

				player.getCurrentState().then((state) => {
					//console.log("getCurrentState() ", state);
					!state ? setIsActive(false) : setIsActive(true);
				});
			});

			player.connect();
		};
	}, [accessToken]);

	const playTrack = (uri: string) => {
		if (player && deviceId) {
			player.activateElement();
			fetch(
				`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
				{
					method: "PUT",
					body: JSON.stringify({ uris: [uri] }), //NOTE; You can pass this an array of URIs to let create a "playlist" and let it autoplay
					//body: JSON.stringify({ uris: ['spotify:track:22DysDIxio06fLuxT0f6g8', 'spotify:track:0VBBWt0uJxXNVb624WtOnC'] }),
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				},
			).then((response) => {
				console.log("playing the track: ", response);
				setIsPaused(false);
				return;
			});
		}
	};

	const pauseTrack = () => {
		if (player && deviceId) {
			fetch(
				`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				},
			).then(() => {
				console.log("Pausing track");
				setIsPaused(true);
			});
		}
	};

	const togglePlayPause = (trackUri: string) => {
		if (currentTrack?.uri === trackUri) {
			if (isPaused) {
				console.log("RESUME ⏯");
				playTrack(trackUri);
			} else {
				console.log("PAUSE ⏸");
				pauseTrack();
			}
		} else {
			console.log("PLAY ▶️");
			playTrack(trackUri);
		}
	};

	const getIcon = (track) => {
		if (currentTrack?.uri !== track.uri) {
			return <PlayIcon aria-hidden="true" className="h-5 w-5" />;
		}
		return isPaused ? (
			<PlayIcon aria-hidden="true" className="h-5 w-5" />
		) : (
			<PauseIcon aria-hidden="true" className="h-5 w-5" />
		);
	};

	if (!isActive && !deviceId) {
		//TODO: Replace with a different image / loading screen
		return (
			<img
				alt=""
				src="https://tailwindui.com/img/component-images/mobile-app-screenshot.png"
			/>
		);
	}

	return (
		<div className="bg-gray-900 px-4 py-8 h-full overflow-y-auto">
			<h2 className="text-white text-center font-bold text-lg">
				Suggested Songs
			</h2>
			<ul role="list" className="divide-y divide-gray-700">
				{tracks?.map((track) => (
					<li
						key={track.uri}
						className="flex items-center justify-between gap-x-6 py-5">
						<div className="flex min-w-0 gap-x-4">
							<Avatar
								square
								alt="artist album cover"
								src={track.image.url}
								className="size-11  text-white"
							/>

							<div className="min-w-0 flex-auto">
								<p className="text-sm font-semibold leading-6 text-white">
									{track.song}
								</p>
								<p className="mt-1 truncate text-xs leading-5 text-gray-400">
									{track.artist}
								</p>
							</div>
						</div>
						<button
							type="button"
							aria-label="Play Track"
							onClick={() => {
								if (currentTrack?.uri === track.uri) {
									togglePlayPause(track.uri);
								} else {
									console.log("PLAY ▶️");
									playTrack(track.uri);
								}
							}}
							className="rounded-full bg-spotify-green p-2 text-white shadow-sm hover:bg-green-700 lg:hover:bg-spotify-green lg:hover:scale-[1.15] lg:transition-transform lg:duration-200 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-spotify-green">
							{getIcon(track)}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
