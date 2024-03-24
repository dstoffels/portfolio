import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/app/header';

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
		<html lang="en" className="scroll-smooth">
			<body
				className={`${inter.className} whitespace-pre-wrap font-inter text-slate-400 antialiased flex from-slate-900 bg-gradient-to-tr to-black box-border`}
			>
				<Header />
				<main className="min-h-screen w-3/5 pt-16">{children}</main>
			</body>
		</html>
	);
}
