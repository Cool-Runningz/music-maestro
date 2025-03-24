import GridBackground from "@/components/icons/GridBackground";

export default function PrivacyPolicy() {
	return (
		<div className="px-6 py-24 sm:py-32 lg:px-8 h-dvh">
			<GridBackground />
			<div className="container mx-auto max-w-2xl ">
				<h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-10 text-center">
					Privacy Policy
				</h1>

                <h2 className="font-bold text-lg">1. Introduction</h2>
                <p className="mb-8">Music Maestro helps you discover and play music through text-based prompts 
                    using <strong>Spotify’s official API and Web Playback SDK</strong>. We also use <strong>OpenAI’s 
                    SDK</strong> for generating recommendations.
                </p>

               <h2 className="font-bold text-lg">2. Data Usage</h2>
                <ul className="mb-8 list-disc pl-8">
                    <li>We <strong>do not store or collect</strong> any personal data.</li>
                    <li>We use Plausible Analytics to track basic, anonymous usage data (e.g., search queries) to improve the app.</li> 
                    <li>All authentication and playback happen directly through <strong>Spotify’s official API</strong>—we <strong>don’t store your Spotify data</strong></li>
                </ul>

                <h2 className="font-bold text-lg">3. How to Disconnect</h2>
                <p>You can revoke Music Maestro’s access anytime via your&nbsp;
                    <a href="https://www.spotify.com/us/account/apps/" target="_blank" rel="noopener noreferrer"
                     className="underline">Spotify account settings
                     </a>.
                </p>

			</div>            
		</div>
	);
}