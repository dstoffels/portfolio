import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';

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
			<body className={`${inter.className} flex min-h-screen w-full font-sans`}>
				<Header />
				<main className="w-5/6">{children}</main>
			</body>
		</html>
	);
}
