import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import MusicProvider from "@/contexts/MusicContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Music Maestro",
	description: "Curate a playlist of songs based on any search criteria.",
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
