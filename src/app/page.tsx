import GridBackground from "@/components/grid-background";
import MobilePhone from "@/components/mobile-phone";
import SearchInput from "@/components/search-input";
import LoginButton from "@/components/login-button";
import Footer from "@/components/footer";

export default function LandingPage() {
	return (
		<div className="bg-white">
			<header className="absolute inset-x-0 top-0 z-50">
				<nav
					className="flex items-center justify-between p-6 lg:px-8"
					aria-label="Global">
					<div className="flex lg:flex-1">
						<a href="#" className="-m-1.5 p-1.5">
							<span className="sr-only">Your Company</span>
							<img
								className="h-8 w-auto"
								src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
								alt=""
							/>
						</a>
					</div>

					<div className=" lg:flex lg:flex-1 lg:justify-end">
						<LoginButton />
					</div>
				</nav>
			</header>

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
								system uses AI to create unique mixes based on
								any search criteria.
							</p>
							<div className="mt-10 flex items-center gap-x-6">
								<LoginButton />
							</div>
							<SearchInput />
						</div>
						<MobilePhone>
							<img
								src="https://tailwindui.com/img/component-images/mobile-app-screenshot.png"
								alt=""
							/>
						</MobilePhone>
					</div>
				</div>
				<Footer />
			</main>
		</div>
	);
}
