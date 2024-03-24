import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/app/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Dan O Stoffels',
	description: 'Full Stack Developer',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth">
			<body
				className={`${inter.className} whitespace-pre-wrap font-inter antialiased lg:flex text-slate-500  from-slate-900 bg-gradient-to-tr to-black box-border`}
			>
				<Header />
				<main className="min-h-screen lg:w-3/5 py-16">{children}</main>
			</body>
		</html>
	);
}
