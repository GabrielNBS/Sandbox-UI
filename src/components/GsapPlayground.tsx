'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function GsapPlayground() {
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={containerRef}
			className="flex flex-col items-center justify-center min-h-[500px] w-full text-white p-8 border-2 border-dashed border-white/20 rounded-3xl bg-neutral-900/50 backdrop-blur-md relative overflow-hidden"
		>
			{/* Efeitos de fundo sutis */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-indigo-500/10 blur-[80px] pointer-events-none" />

			<div className="z-10 text-center max-w-lg space-y-6">
				<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold tracking-wider uppercase">
					GSAP Sandbox Ready
				</div>

				<h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
					Espaço de Aprendizado GSAP
				</h2>

				<p className="text-neutral-400 text-sm leading-relaxed">
					Este componente está configurado e pronto para você programar! Modifique este arquivo para
					testar suas ideias, criar tweens, timelines e efeitos interativos com a biblioteca GSAP.
				</p>

				<div className="p-4 bg-black/40 rounded-2xl border border-white/5 font-mono text-left text-xs space-y-2 max-w-sm mx-auto shadow-inner">
					<div className="text-neutral-500">// Comece editando este arquivo em:</div>
					<div className="text-emerald-400 font-medium break-all">
						src/components/GsapPlayground.tsx
					</div>
				</div>
			</div>
		</div>
	);
}
