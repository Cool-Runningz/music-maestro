import React from "react";
import { auth } from "@/auth";
import AuthButton from "@/components/AuthButton";
import { Avatar } from "@/components/catalyst/avatar";

const getInitials = (name: string) => {
	if (!name) return "?";
	return name
		.split(" ")
		.map((word) => word[0])
		.join(" ");
};

export default async function NavigationBar() {
	const session = await auth();
	return (
		<header className="absolute inset-x-0 top-0 z-50">
			<nav
				className="flex items-center justify-between p-6 lg:px-8"
				aria-label="Global">
				<div className="flex lg:flex-1">
					<a href="#" className="-m-1.5 p-1.5">
						<span className="sr-only">Music Maestro</span>
						<img
							className="h-8 w-auto"
							src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
							alt=""
						/>
					</a>
				</div>

				<div className=" lg:flex lg:flex-1 lg:justify-end gap-x-8">
					<AuthButton />
					{session?.user ? (
						<Avatar
							src={session?.user?.image}
							alt="Spotify profile avatar"
							initials={getInitials(session?.user?.name ?? "")}
							className="size-10 bg-cyan-700 text-white"
						/>
					) : null}
				</div>
			</nav>
		</header>
	);
}
