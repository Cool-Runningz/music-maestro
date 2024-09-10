const faqs = [
	{
		id: 1,
		question: "Why do I get an error when trying to log in?",
		answer: (
			<>
				Music Maestro is still in the review process with Spotify. This
				means I need to manually add each user to allow authentication.
				If you&apos;re interested in using this, fill out this{" "}
				<a
					href="https://musicmaestro.io/contact"
					className="text-blue-500 underline">
					contact form
				</a>{" "}
				and I will try my best to get you early beta access.
			</>
		),
	},
	{
		id: 2,
		question: "Why can't I play music in the browser?",
		answer: "Spotify requires users to have a Premium account. If you don’t have a premium account, you can still get song recommendations from Music Maestro, but playback won't be available within the app.",
	},
	{
		id: 3,
		question: "Is this project open source?",
		answer: (
			<>
				Yes, Music Maestro is open source! You can check out the code on{" "}
				<a
					href="https://github.com/Cool-Runningz/music-maestro"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-500 underline">
					GitHub
				</a>
				.
			</>
		),
	},
	{
		id: 4,
		question: "What tech stack was used to build this project?",
		answer: (
			<>
				Check out my{" "}
				<a
					href="https://blog.alyssaholland.me/music-maestro"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-500 underline">
					blog post
				</a>{" "}
				to learn more about how this project was implemented.
			</>
		),
	},
];

export default function FAQ() {
	return (
		<div className="bg-white">
			<div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
				<h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
					Frequently Asked Questions
				</h2>
				<div className="mt-12">
					<dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:gap-x-10">
						{faqs.map((faq) => (
							<div key={faq.id}>
								<dt className="text-base font-semibold leading-7 text-gray-900">
									{faq.question}
								</dt>
								<dd className="mt-2 text-base leading-7 text-gray-600">
									{faq.answer}
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
}
