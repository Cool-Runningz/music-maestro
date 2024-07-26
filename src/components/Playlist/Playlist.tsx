"use client";
import React from "react";
import { Avatar } from "@/components/catalyst/avatar";
import { useMusic } from "@/contexts/MusicContext";
import useSpotifyWebPlayback from "@/hooks/useSpotifyWebPlayback";
import Image from "next/image";
import LoadingRow from "@/components/icons/LoadingRow";
import NoResults from "@/components/Playlist/NoResults";
import { SpotifyBanner } from "@/components/icons/Logos";
import { SimplifiedTrack } from "@/types/custom.types";
import { SPOTIFY_PLAYER_URL } from "@/utils/constants";
import { getAriaLabelText, getIcon } from "./helpers";
import { usePlausible } from "next-plausible";

export default function Playlist({ accessToken }: { accessToken: string }) {
	//Context
	const { tracks, isLoading } = useMusic();

	//Hooks
	const plausible = usePlausible();
	const {
		player,
		deviceId,
		currentTrack,
		isActive,
		isPlaying,
		setIsPlaying,
	} = useSpotifyWebPlayback(accessToken);

	const playTrack = (uri: SimplifiedTrack["uri"]) => {
		if (player && deviceId) {
			player.activateElement();
			fetch(`${SPOTIFY_PLAYER_URL}/play?device_id=${deviceId}`, {
				method: "PUT",
				body: JSON.stringify({ uris: [uri] }),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			}).then((response) => {
				setIsPlaying(true);
				return;
			});
		}
	};

	const pauseTrack = () => {
		if (player && deviceId) {
			fetch(`${SPOTIFY_PLAYER_URL}/pause?device_id=${deviceId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			}).then(() => {
				setIsPlaying(false);
			});
		}
	};

	const togglePlayPause = (trackUri: SimplifiedTrack["uri"]) => {
		if (currentTrack?.uri === trackUri) {
			if (isPlaying) {
				pauseTrack();
			} else {
				console.log("RESUME ⏯");
				playTrack(trackUri);
			}
		} else {
			playTrack(trackUri);
		}
	};

	if (!accessToken || (!isActive && !deviceId)) {
		return (
			<div className="bg-gray-900 flex justify-center items-center h-full">
				<Image
					className="mx-auto w-auto h-auto"
					src="/Spotify_Icon_Green.png"
					alt="Spotify Icon"
					width={150}
					height={75}
					priority
				/>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="bg-gray-900 h-full py-8">
				<SpotifyBanner />
				<p className="sr-only">Loading...</p>
				<div className="flex flex-col gap-y-4 mt-6">
					{Array.from({ length: 4 }, (_, index) => (
						<LoadingRow key={index} />
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="bg-gray-900 px-4 py-8 h-full overflow-y-auto">
			<h2 className="text-white text-center font-bold text-lg sr-only">
				Playlist
			</h2>
			<SpotifyBanner />
			{!tracks || tracks?.length === 0 ? (
				<NoResults />
			) : (
				<ul role="list" className="divide-y divide-gray-700">
					{tracks.map((track) => (
						<li
							key={track?.uri}
							className="flex items-center justify-between gap-x-6 py-5">
							<div className="flex min-w-0 gap-x-4">
								<Avatar
									square
									alt={`${track?.artist} album cover`}
									src={track?.image?.url}
									className="size-11 text-white"
								/>

								<div className="min-w-0 flex-auto">
									<p className="text-sm truncate font-semibold leading-6 text-white">
										{track?.song}
									</p>
									<p className="mt-1 truncate text-xs leading-5 text-gray-400">
										{track?.artist}
									</p>
								</div>
							</div>
							<button
								type="button"
								aria-label={getAriaLabelText(track, isPlaying)}
								onClick={() => {
									if (currentTrack?.uri === track?.uri) {
										togglePlayPause(track.uri);
										plausible(`Playlist: Play or Pause`, {
											props: { song: track?.song },
										});
									} else {
										playTrack(track.uri);
										plausible(`Playlist: Play`, {
											props: { song: track?.song },
										});
									}
								}}
								className="rounded-full bg-spotify-green p-2 text-white shadow-sm hover:bg-green-700 lg:hover:bg-spotify-green lg:hover:scale-[1.15] lg:transition-transform lg:duration-200 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-spotify-green">
								{getIcon(track, currentTrack, isPlaying)}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
