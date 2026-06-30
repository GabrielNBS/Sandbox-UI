'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Layers, MousePointerClick, Move, Sliders, Type, Zap } from 'lucide-react';
import { useRef, useState } from 'react';

// Registrando os plugins necessários
gsap.registerPlugin(ScrollTrigger, useGSAP);

if (process.env.NODE_ENV === 'development') {
	ScrollTrigger.defaults({ markers: false }); // Desativado por padrão para não poluir todas as abas
}

// --- Componentes para cada Aba ---

// 1. Horizontal Scroll
function HorizontalScrollPlayground() {
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const panels = gsap.utils.toArray<HTMLElement>('.panel');
			if (panels.length === 0) return;

			gsap.to(panels, {
				xPercent: -100 * (panels.length - 1),
				ease: 'none',
				scrollTrigger: {
					trigger: containerRef.current,
					start: 'top top',
					end: () => `+=${(panels.length - 1) * window.innerWidth}`,
					scrub: 1,
					pin: true,
					pinSpacing: true,
					anticipatePin: 1,
					invalidateOnRefresh: true,
					snap: {
						snapTo: 1 / (panels.length - 1),
						ease: 'power3.inOut',
						directional: true,
					},
				},
			});
		},
		{ scope: containerRef }
	);

	return (
		<div
			ref={containerRef}
			className="w-full h-screen overflow-hidden flex flex-nowrap bg-neutral-950"
		>
			<div className="panel w-screen h-full shrink-0 flex flex-col items-center justify-center bg-gradient-to-br from-red-600 to-red-900 text-amber-50">
				<h1 className="text-5xl font-black mb-4">Painel 1</h1>
				<p className="text-white/60">Role para baixo para iniciar a transição horizontal</p>
			</div>
			<div className="panel w-screen h-full shrink-0 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-600 to-emerald-900 text-amber-50">
				<h1 className="text-5xl font-black mb-4">Painel 2</h1>
				<p className="text-white/60">Deslizando horizontalmente...</p>
			</div>
			<div className="panel w-screen h-full shrink-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-blue-900 text-amber-50">
				<h1 className="text-5xl font-black mb-4">Painel 3</h1>
				<p className="text-white/60">Fim da animação de rolagem horizontal</p>
			</div>
		</div>
	);
}

// 2. Text Effects (Aba 2)
function TextEffectsPlayground() {
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			// Escreva aqui sua animação de texto com GSAP
			gsap.from('.title-word', {
				y: 80,
				opacity: 0,
				duration: 1,
				stagger: 0.15,
				ease: 'power4.out',
				delay: 0.2,
			});
		},
		{ scope: containerRef }
	);

	return (
		<div
			ref={containerRef}
			className="w-full h-screen flex flex-col items-center justify-center bg-neutral-950 px-6"
		>
			<div className="text-center max-w-2xl">
				<div className="overflow-hidden mb-2">
					<h2 className="title-word text-6xl font-black text-white leading-tight">TEXT</h2>
				</div>
				<div className="overflow-hidden mb-2">
					<h2 className="title-word text-6xl font-black text-indigo-400 leading-tight">
						ANIMATION
					</h2>
				</div>
				<div className="overflow-hidden mb-6">
					<h2 className="title-word text-6xl font-black text-white leading-tight">PLAYGROUND</h2>
				</div>
				<p className="title-word text-white/50 max-w-md mx-auto">
					Insira seus textos e explore efeitos com stagger, split-text caseiros e transições
					tipográficas.
				</p>
			</div>
		</div>
	);
}

// 3. Mouse Interaction / Hover (Aba 3)
function HoverPlayground() {
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			// Escreva aqui sua animação de interação com mouse/hover
		},
		{ scope: containerRef }
	);

	return (
		<div
			ref={containerRef}
			className="w-full h-screen flex flex-col items-center justify-center bg-neutral-950 px-6"
		>
			<div className="text-center max-w-md mb-8">
				<h2 className="text-3xl font-bold text-white mb-2">Mouse & Hover</h2>
				<p className="text-white/40 text-sm">
					Use triggers de mouse, animações 3D de rotação ou imãs de cursor.
				</p>
			</div>

			<div className="group relative w-72 h-96 rounded-2xl bg-neutral-900 border border-white/10 flex flex-col items-center justify-center overflow-hidden hover:border-indigo-500/50 transition-colors duration-300">
				<div className="absolute inset-0 bg-gradient-to-t from-indigo-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
				<MousePointerClick className="w-12 h-12 text-white/20 mb-4 group-hover:text-indigo-400 group-hover:scale-110 transition-all duration-300" />
				<span className="text-white font-semibold">Card Interativo</span>
				<span className="text-white/40 text-xs mt-1">Passe o mouse ou clique</span>
			</div>
		</div>
	);
}

// 4. Timeline Controls (Aba 4)
function TimelinePlayground() {
	const containerRef = useRef<HTMLDivElement>(null);
	const boxRef = useRef<HTMLDivElement>(null);
	const tlRef = useRef<gsap.core.Timeline | null>(null);

	useGSAP(
		() => {
			const tl = gsap.timeline({ paused: true });
			tlRef.current = tl;

			tl.to(boxRef.current, { x: 100, rotation: 360, duration: 1, ease: 'power2.inOut' })
				.to(boxRef.current, { y: 100, scale: 1.5, duration: 0.8, ease: 'bounce.out' })
				.to(boxRef.current, { x: 0, rotation: 0, duration: 1, ease: 'power2.inOut' })
				.to(boxRef.current, { y: 0, scale: 1, duration: 0.8, ease: 'power2.out' });
		},
		{ scope: containerRef }
	);

	const handlePlay = () => tlRef.current?.play();
	const handlePause = () => tlRef.current?.pause();
	const handleReverse = () => tlRef.current?.reverse();
	const handleRestart = () => tlRef.current?.restart();

	return (
		<div
			ref={containerRef}
			className="w-full h-screen flex flex-col items-center justify-center bg-neutral-950 px-6"
		>
			<div className="text-center max-w-md mb-8">
				<h2 className="text-3xl font-bold text-white mb-2">Controles de Timeline</h2>
				<p className="text-white/40 text-sm">
					Crie animações complexas passo a passo e controle o fluxo de reprodução.
				</p>
			</div>

			<div className="w-80 h-80 border border-white/5 bg-neutral-900/50 rounded-3xl flex items-center justify-center mb-8 relative">
				<div
					ref={boxRef}
					className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/20"
				/>
			</div>

			<div className="flex flex-wrap gap-3">
				<button
					onClick={handlePlay}
					type="button"
					className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors"
				>
					Play
				</button>
				<button
					onClick={handlePause}
					type="button"
					className="px-4 py-2 bg-neutral-800 text-white font-semibold rounded-lg hover:bg-neutral-700 transition-colors"
				>
					Pause
				</button>
				<button
					onClick={handleReverse}
					type="button"
					className="px-4 py-2 bg-neutral-800 text-white font-semibold rounded-lg hover:bg-neutral-700 transition-colors"
				>
					Reverse
				</button>
				<button
					onClick={handleRestart}
					type="button"
					className="px-4 py-2 bg-neutral-800 text-white font-semibold rounded-lg hover:bg-neutral-700 transition-colors"
				>
					Restart
				</button>
			</div>
		</div>
	);
}

// 5. SVG Motion Path (Aba 5)
function SVGPlayground() {
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			// Escreva aqui sua animação de SVG
		},
		{ scope: containerRef }
	);

	return (
		<div
			ref={containerRef}
			className="w-full h-screen flex flex-col items-center justify-center bg-neutral-950 px-6"
		>
			<div className="text-center max-w-md mb-8">
				<h2 className="text-3xl font-bold text-white mb-2">SVG & Motion Path</h2>
				<p className="text-white/40 text-sm">
					Anime traçados (strokeDasharray) ou faça objetos seguirem caminhos.
				</p>
			</div>

			<div className="w-96 h-64 border border-white/5 bg-neutral-900/50 rounded-3xl flex items-center justify-center">
				<svg className="w-80 h-48" viewBox="0 0 100 50">
					<title>Caminho de Teste SVG</title>
					<path
						d="M10 25 C 30 5, 70 45, 90 25"
						fill="none"
						stroke="rgba(255,255,255,0.1)"
						strokeWidth="2"
					/>
					<circle cx="10" cy="25" r="4" fill="#3b82f6" />
				</svg>
			</div>
		</div>
	);
}

// 6. Draggable & Physics (Aba 6)
function DraggablePlayground() {
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			// Registre ScrollTrigger ou outros plugins adicionais caso queira experimentar física
		},
		{ scope: containerRef }
	);

	return (
		<div
			ref={containerRef}
			className="w-full h-screen flex flex-col items-center justify-center bg-neutral-950 px-6"
		>
			<div className="text-center max-w-md mb-8">
				<h2 className="text-3xl font-bold text-white mb-2">Draggable & Physics</h2>
				<p className="text-white/40 text-sm">
					Experimente arrastar elementos com físicas de atrito e inércia do GSAP.
				</p>
			</div>

			<div className="w-80 h-80 border border-dashed border-white/10 rounded-3xl flex items-center justify-center bg-neutral-900/20">
				<div className="w-20 h-20 bg-amber-500 rounded-3xl flex items-center justify-center cursor-grab active:cursor-grabbing font-bold text-white text-xs select-none">
					Arraste-me
				</div>
			</div>
		</div>
	);
}

// --- Componente Principal ---

const TABS = [
	{ id: 'scroll', name: 'ScrollTrigger', icon: Layers, component: HorizontalScrollPlayground },
	{ id: 'text', name: 'Text Effects', icon: Type, component: TextEffectsPlayground },
	{ id: 'hover', name: 'Hover & Interaction', icon: MousePointerClick, component: HoverPlayground },
	{ id: 'timeline', name: 'Timeline Controls', icon: Sliders, component: TimelinePlayground },
	{ id: 'svg', name: 'SVG Motion', icon: Compass, component: SVGPlayground },
	{ id: 'draggable', name: 'Draggable & Physics', icon: Move, component: DraggablePlayground },
];

export default function BlankPlayground() {
	const [activeTabIdx, setActiveTabIdx] = useState(0);
	const ActiveComponent = TABS[activeTabIdx].component;

	return (
		<div className="relative w-full min-h-screen bg-neutral-950 text-white overflow-x-hidden">
			{/* Barra de Navegação Fixed com Estilo Glassmorphism */}
			<header className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-4xl px-4">
				<nav className="flex items-center justify-between px-6 py-3 rounded-full border border-white/10 bg-neutral-950/80 backdrop-blur-xl shadow-2xl">
					<div className="flex items-center gap-2">
						<Zap className="w-5 h-5 text-indigo-400 fill-indigo-400/20" />
						<span className="font-bold text-sm tracking-wider uppercase text-white/90">
							GSAP Lab
						</span>
					</div>

					<div className="flex items-center gap-1 md:gap-2">
						{TABS.map((tab, idx) => {
							const Icon = tab.icon;
							const isActive = activeTabIdx === idx;
							return (
								<button
									key={tab.id}
									onClick={() => setActiveTabIdx(idx)}
									type="button"
									className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
										isActive
											? 'bg-white text-black shadow-lg shadow-white/5'
											: 'text-white/60 hover:text-white hover:bg-white/5'
									}`}
									title={tab.name}
								>
									<Icon className="w-3.5 h-3.5" />
									<span className="hidden md:inline">{tab.name}</span>
								</button>
							);
						})}
					</div>
				</nav>
			</header>

			{/* Área de Visualização Principal */}
			<main className="w-full min-h-screen">
				<ActiveComponent />
			</main>
		</div>
	);
}
