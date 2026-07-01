'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function GsapPlayground() {
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (containerRef.current) {
				const cube = containerRef.current.querySelector('.cube-1');
				if (!cube) return;

				const infoCard = cube.querySelector('.info-card');
				const quoteText = cube.querySelector('.quote-text');
				const profileImg = cube.querySelector('.profile-img');

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: containerRef.current,
						start: 'top top',
						end: 'bottom bottom',
						scrub: 1, // Ancorado ao scroll
					},
				});

				// SECTION 1 -> SECTION 2 (O ponto se desloca e vira o Card de Info)
				tl.to(cube, {
					marginTop: '0px',
					marginLeft: '0px',
					xPercent: -50,
					yPercent: -50,
					x: 0,
					y: 0,
					width: '380px',
					height: '240px',
					borderRadius: '24px',
					backgroundColor: 'rgba(255, 255, 255, 0.08)',
					borderColor: 'rgba(255, 255, 255, 0.15)',
					duration: 1,
				})
				.to(infoCard, {
					opacity: 1,
					duration: 0.3,
				}, '-=0.3')

				// SECTION 2 -> SECTION 3 (O Card vira a base retangular da frase de efeito)
				.to(infoCard, {
					opacity: 0,
					duration: 0.2,
				})
				.to(cube, {
					x: 0,
					y: 0,
					width: '560px',
					height: '70px',
					borderRadius: '16px',
					backgroundColor: 'rgba(99, 102, 241, 0.15)', // indigo translúcido
					borderColor: 'rgba(99, 102, 241, 0.3)',
					duration: 1,
				})
				.to(quoteText, {
					opacity: 1,
					duration: 0.3,
				}, '-=0.3')

				// SECTION 3 -> SECTION 4 (A base vira o quadrado/círculo da Foto)
				.to(quoteText, {
					opacity: 0,
					duration: 0.2,
				})
				.to(cube, {
					x: 0,
					y: 0,
					width: '300px',
					height: '300px',
					borderRadius: '2rem',
					backgroundColor: 'rgba(255, 255, 255, 0.05)',
					borderColor: 'rgba(255, 255, 255, 0.2)',
					duration: 1,
				})
				.to(profileImg, {
					opacity: 1,
					duration: 0.4,
				}, '-=0.4');
			}
		},
		{ scope: containerRef }
	);

	return (
		<div ref={containerRef} className="relative w-full">
			{/* Morphing Canvas (cube-1) que começa como o ponto do "ı" */}
			<div 
				className="cube-1 fixed z-50 bg-white/90 glass rounded-full pointer-events-none flex items-center justify-center border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.15)] overflow-hidden"
				style={{
					width: '14px',
					height: '14px',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					marginTop: '-76px', // Alinhamento vertical do ponto da letra "ı"
					marginLeft: '-90px', // Alinhamento horizontal do ponto da letra "ı"
				}}
			>
				{/* Conteúdo 2: Card de Informações Profissionais */}
				<div className="info-card flex flex-col justify-between p-6 w-[380px] h-[240px] absolute opacity-0 select-none pointer-events-none">
					<div className="flex justify-between items-start text-left">
						<div>
							<h3 className="text-xl font-bold text-white leading-tight font-outfit">Gabriel NBS</h3>
							<p className="text-indigo-400 text-xs font-semibold mt-0.5">Creative Developer & UI Engineer</p>
						</div>
						<div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-sm text-indigo-300">
							<Terminal className="w-5 h-5" />
						</div>
					</div>
					<div className="space-y-3 text-left">
						<p className="text-white/60 text-xs leading-relaxed">
							Construindo interfaces interativas e animações fluidas integradas ao ecossistema do React, Next.js e GSAP.
						</p>
						<div className="flex gap-2">
							<span className="text-[9px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white/50 uppercase font-mono">GSAP 3</span>
							<span className="text-[9px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white/50 uppercase font-mono">Next.js</span>
							<span className="text-[9px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white/50 uppercase font-mono">React 19</span>
						</div>
					</div>
				</div>

				{/* Conteúdo 3: Quote Text (Base de Frase) */}
				<div className="quote-text text-center px-6 absolute w-[560px] h-[70px] flex items-center justify-center opacity-0 select-none pointer-events-none">
					<span className="text-indigo-200 font-extrabold text-xs md:text-sm tracking-widest uppercase font-mono leading-none">
						Code is the raw material of art
					</span>
				</div>

				{/* Conteúdo 4: Imagem */}
				<img 
					src="/images/design.png" 
					alt="Profile Showcase" 
					className="profile-img w-[300px] h-[300px] object-cover absolute opacity-0 select-none pointer-events-none"
				/>
			</div>

			{/* Section 1: Intro / Ponto do I */}
			<div className="box h-screen w-full bg-slate-950 flex flex-col items-center justify-center text-center px-4 relative">
				<div className="relative">
					{/* Usamos "ı" (sem ponto) para que o morphing canvas represente o ponto físico da letra */}
					<h1 className="text-8xl md:text-9xl font-black text-white/10 tracking-tighter font-outfit select-none">
						ı n t r o
					</h1>
				</div>
				<p className="text-white/40 mt-6 text-sm max-w-xs select-none">
					Role a página para ver o ponto da letra "ı" ganhar vida própria e se transformar.
				</p>
			</div>

			{/* Section 2: Card Profissional */}
			<div className="box h-screen w-full bg-slate-900/50 flex flex-col items-center justify-center relative">
				<div className="absolute top-1/4 text-center select-none pointer-events-none">
					<span className="text-[10px] bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full text-indigo-400 font-bold uppercase tracking-wider">
						Section 02
					</span>
					<h2 className="text-2xl font-bold text-white/20 mt-3 tracking-tight font-outfit">
						Informações Profissionais
					</h2>
				</div>
			</div>

			{/* Section 3: Frase de Efeito */}
			<div className="box h-screen w-full bg-slate-950 flex flex-col items-center justify-center relative">
				<div className="absolute top-1/4 text-center select-none pointer-events-none">
					<span className="text-[10px] bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full text-indigo-400 font-bold uppercase tracking-wider">
						Section 03
					</span>
					<h2 className="text-2xl font-bold text-white/20 mt-3 tracking-tight font-outfit">
						Frase de Efeito
					</h2>
				</div>
			</div>

			{/* Section 4: Foto */}
			<div className="box h-screen w-full bg-slate-900/50 flex flex-col items-center justify-center relative">
				<div className="absolute top-1/4 text-center select-none pointer-events-none">
					<span className="text-[10px] bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full text-indigo-400 font-bold uppercase tracking-wider">
						Section 04
					</span>
					<h2 className="text-2xl font-bold text-white/20 mt-3 tracking-tight font-outfit">
						Showcase Visual
					</h2>
				</div>
			</div>
		</div>
	);
}
