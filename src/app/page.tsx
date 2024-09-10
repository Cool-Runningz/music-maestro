import GridBackground from "@/components/icons/GridBackground";
import MobilePhone from "@/components/icons/MobilePhone";
import SearchWidget from "@/components/SearchWidget";
import AuthButton from "@/components/AuthButton";
import Playlist from "@/components/Playlist/Playlist";
import FAQ from "@/components/FAQ";
import { auth } from "@/auth";

export default async function LandingPage() {
	const session = await auth();
	return (
		<div className="bg-white">
			<main>
				<div className="relative isolate pt-14">
					<GridBackground />
					<div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-28">
						<div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
							<h1 className="mt-10 max-w-lg text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
								Craft Custom Playlists
							</h1>
							<p className="mt-6 text-lg leading-8 text-gray-600">
								Discover music on Spotify. Our system uses AI to
								create tailored playlists based on any search
								criteria.
							</p>
							<div className="mt-2 sm:mt-10">
								{session?.user ? (
									<SearchWidget />
								) : (
									<div className="invisible sm:visible">
										<AuthButton />
									</div>
								)}
							</div>
						</div>
						<MobilePhone>
							<Playlist
								accessToken={session?.access_token ?? ""}
							/>
						</MobilePhone>
					</div>
				</div>
				<FAQ />
			</main>
		</div>
	);
}
