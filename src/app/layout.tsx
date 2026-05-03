import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
});

const outfit = Outfit({
	subsets: ['latin'],
	variable: '--font-outfit',
});

export const metadata: Metadata = {
	title: 'Premium Sandbox | Isolated Component Testing',
	description:
		'A high-end sandbox environment for rapid prototyping and component testing with Next.js, Tailwind, and Biome.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark" suppressHydrationWarning>
			<body className={`${inter.variable} ${outfit.variable} font-sans antialiased`} suppressHydrationWarning>
				{children}
			</body>
		</html>
	);
}
