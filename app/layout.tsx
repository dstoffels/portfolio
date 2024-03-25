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
				className={`${inter.className} whitespace-pre-wrap font-inter antialiased text-slate-500  from-slate-900 bg-gradient-to-br to-black box-border`}
			>
				<main className="">{children}</main>
			</body>
		</html>
	);
}
