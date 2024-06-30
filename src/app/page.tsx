import GridBackground from "@/components/grid-background";
import MobilePhone from "@/components/mobile-phone";
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
						<a
							href="#"
							className="text-sm font-semibold leading-6 text-gray-900">
							Log in <span aria-hidden="true">&rarr;</span>
						</a>
					</div>
				</nav>
			</header>

			<main>
				<div className="relative isolate pt-14">
					<GridBackground />

					<div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
						<div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
							<h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
								A better way to find music
							</h1>
							<p className="mt-6 text-lg leading-8 text-gray-600">
								Esse id magna consectetur fugiat non dolor in ad
								laboris magna laborum ea consequat. Nisi irure
								aliquip nisi adipisicing veniam voluptate id. In
								veniam incididunt ex veniam adipisicing sit.
							</p>
							<div className="mt-10 flex items-center gap-x-6">
								<a
									href="#"
									className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
									Get started
								</a>
								<a
									href="#"
									className="text-sm font-semibold leading-6 text-gray-900">
									Learn more <span aria-hidden="true">→</span>
								</a>
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
				<Footer />
			</main>
		</div>
	);
}
