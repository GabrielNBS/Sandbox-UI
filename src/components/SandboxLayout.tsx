'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { SandboxNavigator } from './SandboxNavigator';
import { useSandbox } from './SandboxProvider';

export function SandboxLayout({ children }: { children: React.ReactNode }) {
	const { activeExperiment } = useSandbox();
	const pathname = usePathname();
	const [isIntroActive, setIsIntroActive] = useState(true);

	// Controla o tempo de exibição da animação 'once' (Introdução)
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsIntroActive(false);
		}, 1500); // 1.5s de introdução
		return () => clearTimeout(timer);
	}, []);

	// Gerenciamento de rolagem e visibilidade da scrollbar
	useEffect(() => {
		if (isIntroActive) {
			if (typeof window !== 'undefined') {
				document.documentElement.style.overflowY = 'hidden';
				document.body.style.overflowY = 'hidden';
				document.documentElement.classList.remove('show-scrollbar');
			}
		} else {
			if (typeof window !== 'undefined') {
				document.documentElement.style.overflowY = '';
				document.body.style.overflowY = '';
				// Exibe a scrollbar suavemente após a entrada do site
				setTimeout(() => {
					document.documentElement.classList.add('show-scrollbar');
				}, 100);
			}
		}
	}, [isIntroActive]);

	return (
		<div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-white/10">
			{/* Intro Overlay para animação 'once' com Framer Motion */}
			<AnimatePresence>
				{isIntroActive && (
					<motion.div
						id="intro-overlay"
						initial={{ opacity: 1 }}
						exit={{ 
							y: '-100%', 
							transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } 
						}}
						className="fixed inset-0 bg-background z-[200] flex items-center justify-center pointer-events-none"
					>
						<motion.div
							initial={{ opacity: 0, scale: 0.85, y: 15 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.4 } }}
							transition={{ duration: 0.7, ease: 'easeOut' }}
							className="logo-wrapper flex flex-col items-center gap-4 text-center"
						>
							<div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl shadow-indigo-500/10">
								<Terminal className="w-10 h-10 text-indigo-400" />
							</div>
							<div>
								<h1 className="text-2xl font-bold font-outfit text-white tracking-tight">
									Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Sandbox</span>
								</h1>
								<p className="text-white/30 text-[10px] uppercase tracking-widest font-bold mt-1.5">
									Creative Testing Lab
								</p>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Main Content com Transição de Rotas controlada via Framer Motion */}
			<main
				id="sandbox-content-container"
				className={`flex-1 relative overflow-x-hidden flex flex-col items-center justify-center ${
					activeExperiment?.fullWidth ? 'p-0 font-sans' : 'p-8 font-sans'
				}`}
			>
				<AnimatePresence mode="wait" initial={false}>
					<motion.div
						key={pathname}
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -15 }}
						transition={{ duration: 0.35, ease: 'easeInOut' }}
						className="w-full h-full flex flex-col items-center justify-center"
					>
						{children}
					</motion.div>
				</AnimatePresence>
			</main>

			<SandboxNavigator />
		</div>
	);
}
export default SandboxLayout;
