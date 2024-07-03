import React from "react";
import LoginButton from "./login-button";

//TODO: Update to use catalyst's navbar component
export default function NavigationBar() {
	return (
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
	);
}
