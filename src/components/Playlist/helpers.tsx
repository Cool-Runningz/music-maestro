import { SimplifiedTrack } from "@/types/custom.types";
import { PlayIcon, PauseIcon } from "@heroicons/react/16/solid";

export const getAriaLabelText = (
	track: SimplifiedTrack,
	isPlaying: boolean,
) => {
	return `${isPlaying ? "Pause" : "Play"} "${track?.song} by ${track?.artist}" Track`;
};

export const getIcon = (
	track: SimplifiedTrack,
	currentTrack: Spotify.Track | undefined,
	isPlaying: boolean,
) => {
	if (currentTrack?.uri !== track.uri) {
		return <PlayIcon aria-hidden="true" className="h-5 w-5" />;
	}
	return isPlaying ? (
		<PauseIcon aria-hidden="true" className="h-5 w-5" />
	) : (
		<PlayIcon aria-hidden="true" className="h-5 w-5" />
	);
};
