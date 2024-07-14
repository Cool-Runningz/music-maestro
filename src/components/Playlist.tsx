import { PlayIcon } from "@heroicons/react/16/solid";
import { Avatar } from "@/components/catalyst/avatar";

const people = [
	{
		name: "Leslie Alexander",
		email: "leslie.alexander@example.com",
		imageUrl:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		href: "#",
	},
	{
		name: "Michael Foster",
		email: "michael.foster@example.com",
		imageUrl:
			"https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		href: "#",
	},
	{
		name: "Dries Vincent",
		email: "dries.vincent@example.com",
		imageUrl:
			"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		href: "#",
	},
	{
		name: "Lindsay Walton",
		email: "lindsay.walton@example.com",
		imageUrl:
			"https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		href: "#",
	},
	{
		name: "Courtney Henry",
		email: "courtney.henry@example.com",
		imageUrl:
			"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		href: "#",
	},
	{
		name: "Tom Cook",
		email: "tom.cook@example.com",
		imageUrl:
			"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		href: "#",
	},
	{
		name: "Courtney Henry",
		email: "courtney.henry@example.com",
		imageUrl:
			"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		href: "#",
	},
	{
		name: "Tom Cook",
		email: "tom.cook@example.com",
		imageUrl:
			"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		href: "#",
	},
	{
		name: "Tom Cook",
		email: "tom.cook@example.com",
		imageUrl:
			"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		href: "#",
	},
];

export default function Playlist() {
	return (
		<div className="bg-gray-900 px-4 py-8 h-full overflow-y-auto">
			<h2 className="text-white text-center font-bold text-lg">
				Suggested Songs
			</h2>
			<ul role="list" className="divide-y divide-gray-700">
				{people.map((person) => (
					<li
						key={person.email}
						className="flex items-center justify-between gap-x-6 py-5">
						<div className="flex min-w-0 gap-x-4">
							<Avatar
								square
								alt="artist album cover"
								src={person.imageUrl}
								className="size-11  text-white"
							/>

							<div className="min-w-0 flex-auto">
								<p className="text-sm font-semibold leading-6 text-white">
									{person.name}
								</p>
								<p className="mt-1 truncate text-xs leading-5 text-gray-400">
									{person.email}
								</p>
							</div>
						</div>
						<button
							type="button"
							aria-label="Play Track"
							className="rounded-full bg-spotify-green p-2 text-white shadow-sm hover:scale-[1.15] transition-transform duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spotify-green">
							<PlayIcon aria-hidden="true" className="h-5 w-5" />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
