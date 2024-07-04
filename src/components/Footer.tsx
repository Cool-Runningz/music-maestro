import React from "react";
import Divider from "@/components/catalyst/divider";
import { TwitterIcon, GitHubIcon } from "@/components/icons/Logos";

export default function Footer() {
	return (
		<footer className="bg-white">
			<Divider />
			<div className="mx-auto max-w-7xl px-6 py-8 md:flex md:items-center md:justify-between lg:px-8">
				<div className="flex justify-center space-x-6 md:order-2">
					<a
						href="https://github.com/Cool-Runningz/music-maestro"
						className="text-gray-500 hover:text-gray-700"
						target="_blank"
						rel="noopener noreferrer">
						<span className="sr-only">GitHub</span>
						<GitHubIcon />
					</a>
					<a
						href="https://twitter.com/alyssa_codes"
						className="text-gray-500 hover:text-gray-700"
						target="_blank"
						rel="noopener noreferrer">
						<span className="sr-only">
							X (the artist formerly known as Twitter)
						</span>
						<TwitterIcon />
					</a>
				</div>
				<div className="mt-8 md:order-1 md:mt-0">
					<p className="text-center text-xs leading-5 text-gray-500">
						Made with 💚 by{" "}
						<a
							href="https://alyssaholland.com"
							className="hover:underline decoration-wavy"
							target="_blank"
							rel="noopener noreferrer">
							Alyssa Holland
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
}
