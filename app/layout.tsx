import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { IBM_Plex_Sans, Source_Code_Pro } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
	variable: "--font-ibm-plex-sans",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

const sourceCodePro = Source_Code_Pro({
	variable: "--font-source-code-pro",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "AprixOS – Portfolio and Playground",
	description:
		"AprixOS is a portfolio, blog, and playground all in one. Built by Lucas Rubo with Next.js, Tailwind CSS, and TypeScript.",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className="dark">
			<body
				className={`${ibmPlexSans.variable} ${sourceCodePro.variable} antialiased font-sans overflow-hidden`}
			>
				{children}
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
