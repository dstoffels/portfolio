import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Dan O Stoffels',
	description: 'A portfolio',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} flex min-h-screen`}>
				<header className="px-10 py-2 bg-slate-700">
					<h1>Dan O Stoffels</h1>
				</header>
				<main>{children}</main>
			</body>
		</html>
	);
}
