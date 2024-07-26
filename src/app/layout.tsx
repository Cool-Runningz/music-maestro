import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import MusicProvider from "@/contexts/MusicContext";

const inter = Inter({ subsets: ["latin"] });

const title =
	"Music Maestro - Craft custom playlists based on any search criteria.";
const description =
	"Leverage AI to curate a playlist of songs and discover music on Spotify.";
const imageUrl =
	"https://raw.githubusercontent.com/Cool-Runningz/music-maestro/main/public/music-maestro-landing-page-90s.png";

export const metadata: Metadata = {
	title,
	description,
	openGraph: {
		type: "website",
		url: "https://musicmaestro.io",
		title,
		description,
		images: [
			{
				url: imageUrl,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title,
		description,
		creator: "@alyssa_codes",
		images: [imageUrl],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<NavigationBar />
				<MusicProvider>{children}</MusicProvider>
				<Footer />
			</body>
		</html>
	);
}
