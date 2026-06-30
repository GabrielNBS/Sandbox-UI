'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowRight, Compass, Eye, Palette, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import PixelTrail from '@/components/PixelTrail';

gsap.registerPlugin(useGSAP);

export default function EmptyTemplate() {
	const containerRef = useRef<HTMLDivElement>(null);
	const imageContainerRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);

	// Animação de entrada da Hero Section
	useGSAP(
		() => {
			const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

			tl.from('.hero-badge', {
				y: -20,
				opacity: 0,
				duration: 0.8,
				delay: 0.2,
			})
				.from(
					'.hero-title span',
					{
						y: 40,
						opacity: 0,
						stagger: 0.1,
						duration: 0.8,
					},
					'-=0.5'
				)
				.from(
					'.hero-desc',
					{
						y: 20,
						opacity: 0,
						duration: 0.8,
					},
					'-=0.6'
				)
				.from(
					'.hero-buttons',
					{
						y: 20,
						opacity: 0,
						duration: 0.8,
					},
					'-=0.6'
				)
				.from(
					imageContainerRef.current,
					{
						scale: 0.95,
						opacity: 0,
						duration: 1,
					},
					'-=0.8'
				);
		},
		{ scope: containerRef }
	);

	return (
		<div
			ref={containerRef}
			className="w-full min-h-[90vh] bg-neutral-950 text-white flex items-center justify-center p-6 md:p-12 relative overflow-hidden"
		>
			{/* Efeitos de Fundo Elegantes */}
			<div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none z-0" />
			<div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none z-0" />
			<div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:40px_40px] pointer-events-none z-0" />

			<div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
				{/* Lado Esquerdo: Conteúdo da Hero */}
				<div ref={textRef} className="lg:col-span-5 space-y-8 text-left">
					<div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wider uppercase">
						<Sparkles className="w-3.5 h-3.5" />
						Efeito Pixel Reveal
					</div>

					<div className="space-y-4">
						<h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] flex flex-col">
							<span className="bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
								Pinte com o
							</span>
							<span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
								Movimento.
							</span>
						</h1>
						<p className="hero-desc text-neutral-400 text-base sm:text-lg leading-relaxed max-w-lg">
							Passe o cursor sobre a obra de arte à direita. Cada movimento seu desenha a pixel art
							com suas cores originais, que gradualmente se desvanecem de volta ao clássico preto e
							branco.
						</p>
					</div>

					{/* Recursos/Tags */}
					<div className="hero-desc grid grid-cols-2 gap-4 max-w-md pt-2">
						<div className="flex items-center gap-2.5 text-neutral-300 text-sm">
							<div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center text-indigo-400">
								<Eye className="w-4 h-4" />
							</div>
							Trilha de Pixels
						</div>
						<div className="flex items-center gap-2.5 text-neutral-300 text-sm">
							<div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center text-indigo-400">
								<Palette className="w-4 h-4" />
							</div>
							Cores Reveladas
						</div>
					</div>

					<div className="hero-buttons flex flex-wrap gap-4 pt-4">
						<button
							type="button"
							className="group px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-neutral-100 active:scale-98 transition-all flex items-center gap-2 shadow-xl shadow-white/5"
						>
							Ver Galeria
							<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
						</button>
						<button
							type="button"
							className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-semibold rounded-xl border border-white/5 hover:border-white/10 active:scale-98 transition-all"
						>
							Saiba Mais
						</button>
					</div>
				</div>

				{/* Lado Direito: Imagem Interativa com Pixel Trail Reveal */}
				<div className="lg:col-span-7 flex justify-center">
					<div
						ref={imageContainerRef}
						className="relative w-full max-w-[640px] aspect-video rounded-2xl md:rounded-4xl border border-white/10 overflow-hidden shadow-2xl bg-neutral-900 group cursor-cell select-none"
					>
						{/* Camada Base: Imagem em Preto e Branco */}
						<div
							className="absolute inset-0 bg-cover bg-center transition-all duration-300"
							style={{
								backgroundImage: 'url("/images/picnic.png")',
								filter: 'grayscale(1) contrast(1.15) brightness(0.85)',
							}}
						/>

						{/* Pixel Trail exclusivo revelando a imagem colorida */}
						<PixelTrail
							gridSize={64}
							trailSize={0.15}
							maxAge={400}
							interpolate={6}
							imageSrc="/images/picnic.png"
							eventSource={imageContainerRef}
							gooeyFilter={{ id: 'image-pixel-trail', strength: 2 }}
						/>

						{/* Overlay de Instrução no canto inferior */}
						<div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/5 text-[10px] sm:text-xs font-medium text-neutral-400 flex items-center gap-1.5 opacity-80 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
							<Compass className="w-3.5 h-3.5 text-indigo-400 animate-spin-slow" />
							Passe o mouse para colorir os pixels
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
