import { MusicalNoteIcon } from "@heroicons/react/24/outline";

export default function NoResults() {
	return (
		<div className="text-center flex flex-col items-center mt-[70%]">
			<MusicalNoteIcon
				aria-hidden="true"
				className="text-white h-16 w-16"
			/>
			<p className="mt-2 text-sm font-semibold text-gray-100">
				No songs to display.
			</p>
			<p className="mt-1 text-sm text-gray-100">
				Get started by searching.
			</p>
		</div>
	);
}
