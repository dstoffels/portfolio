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
			<body
				className={`${inter.className} flex flex-col max-h-screen font-sans dark:bg-zinc-800 text-zinc-300 box-border`}
			>
				<Header />
				<main className="min-h-full flex-1 flex flex-col my-16">{children}</main>
			</body>
		</html>
	);
}
