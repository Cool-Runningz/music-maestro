/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.scdn.co",
				pathname: "/image/*",
			},
		],
	},
};

export default nextConfig;
