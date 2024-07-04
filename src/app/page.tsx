import GridBackground from "@/components/icons/GridBackground";
import MobilePhone from "@/components/icons/MobilePhone";
import SearchInput from "@/components/SearchInput";
import AuthButton from "@/components/AuthButton";
import { auth } from "@/auth";

export default async function LandingPage() {
	const session = await auth();
	return (
		<div className="bg-white">
			<main>
				<div className="relative isolate pt-14">
					<GridBackground />
					<div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
						<div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
							<h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
								Craft the Perfect Playlist
							</h1>
							<p className="mt-6 text-lg leading-8 text-gray-600">
								Discover new music effortlessly. Our intelligent
								system uses AI to create tailored playlists
								based on any search criteria.
							</p>
							<div className="mt-10">
								{session?.user ? (
									<SearchInput />
								) : (
									<AuthButton />
								)}
							</div>
						</div>
						<MobilePhone>
							<img
								src="https://tailwindui.com/img/component-images/mobile-app-screenshot.png"
								alt=""
							/>
						</MobilePhone>
					</div>
				</div>
			</main>
		</div>
	);
}
