'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { useRef, useState } from 'react';
import { X, Code2, Cpu, Maximize, MousePointerClick } from 'lucide-react';
import Image from 'next/image';

// Registra o plugin oficial (gratuito) de morfismo de layout
gsap.registerPlugin(Flip);

const CARDS = [
	{ id: 1, title: 'O Princípio F.L.I.P', category: 'Conceito Core', img: '/images/design.png' },
	{ id: 2, title: 'Por que não MorphSVG?', category: 'Decisão Técnica', img: '/images/performance.png' },
	{ id: 3, title: 'Performance e GPU', category: 'Arquitetura', img: '/images/connectivity.png' },
];

export default function GsapPlayground() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [activeCard, setActiveCard] = useState<number | null>(null);
	const [flipState, setFlipState] = useState<Flip.FlipState | null>(null);

	// A transição de morfismo ocorre exatamente aqui:
	// Sempre que o React altera o estado (activeCard) e remonta o DOM em seu layout final,
	// o GSAP Flip calcula a diferença entre o `flipState` salvo (o Antes) e o DOM atual (o Depois)
	// e injeta a animação (Play).
	useGSAP(
		() => {
			if (flipState) {
				Flip.from(flipState, {
					duration: 0.7,
					ease: 'power4.inOut',
					absolute: true, // Extrai elementos do fluxo normal para evitar reflows caros
					nested: true, // Garante que as imagens e textos filhos "morfem" (escalem) acompanhando o container pai
					onEnter: (elements) =>
						gsap.fromTo(
							elements,
							{ opacity: 0, scale: 0.95 },
							{ opacity: 1, scale: 1, duration: 0.5, delay: 0.1, ease: 'power2.out' }
						),
					onLeave: (elements) =>
						gsap.to(elements, { opacity: 0, scale: 0.95, duration: 0.4 }),
				});
			}
		},
		{ dependencies: [activeCard], scope: containerRef }
	);

	// Função para capturar o layout ANTES do React alterar o estado
	const handleCardClick = (id: number | null) => {
		// FLIP: F de "First". Salvamos o estado físico de todos os elementos na tela com a classe ".morph-item"
		const state = Flip.getState('.morph-item, .morph-bg, .morph-text');
		setFlipState(state);
		// Aciona a mudança de estado que causa o re-render
		setActiveCard(id);
	};

	return (
		<div
			ref={containerRef}
			className="min-h-screen w-full bg-slate-950 flex flex-col md:flex-row text-white p-6 md:p-12 gap-8 relative overflow-hidden"
		>
			{/* Seção Esquerda: Explicações Técnicas */}
			<div className="flex-1 max-w-lg space-y-8 z-10">
				<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
					<Code2 className="w-4 h-4" /> Laboratório de Morfismo Avançado
				</div>

				<div className="space-y-4">
					<h1 className="text-4xl font-black tracking-tight text-white/90">
						Advanced Layout <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Morphing</span>
					</h1>
					<p className="text-neutral-400 text-sm leading-relaxed">
						Uma demonstração técnica de como criar transformações perfeitamente orgânicas (Morfismo) entre estados da interface de usuário sem usar plugins vetoriais pesados.
					</p>
				</div>

				<div className="space-y-6">
					<div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
						<div className="flex items-center gap-3 mb-3">
							<Cpu className="w-5 h-5 text-indigo-400" />
							<h3 className="font-bold text-white/90">A Decisão Arquitetural</h3>
						</div>
						<p className="text-xs text-neutral-400 leading-relaxed mb-4">
							Em UIs modernas baseadas em componentes (Next.js/React), deformar "paths SVG" com o <strong>MorphSVGPlugin</strong> (plugin pago) limita as interações e a semântica web. A melhor alternativa open-source e com foco na engenharia de interface é o <strong>GSAP Flip</strong>.
						</p>
						<p className="text-xs text-neutral-400 leading-relaxed">
							O Flip transforma a propriedade física de qualquer container (de thumbnail para Full-Screen) interpolando instantaneamente a árvore DOM original com cálculos acelerados por GPU.
						</p>
					</div>

					<div className="p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 backdrop-blur-md">
						<div className="flex items-center gap-3 mb-3">
							<MousePointerClick className="w-5 h-5 text-indigo-400" />
							<h3 className="font-bold text-white/90">Interaja com a Grade</h3>
						</div>
						<p className="text-xs text-neutral-400 leading-relaxed">
							Clique nos cartões ao lado para assistir as larguras, arredondamentos (border-radius) e imagens "morfando" do estado empilhado para a sobreposição ativa de leitura.
						</p>
					</div>
				</div>
			</div>

			{/* Seção Direita: Galeria de Morfismo */}
			<div className="flex-1 flex flex-col justify-center items-center md:items-end w-full max-w-xl mx-auto z-10 mt-12 md:mt-0 relative">
				
				{/* Grade de Elementos Inativos (Estado 1) */}
				<div className={`grid grid-cols-2 gap-4 w-full transition-opacity duration-300 ${activeCard !== null ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
					{CARDS.map((card) => (
						<div
							key={`grid-${card.id}`}
							onClick={() => handleCardClick(card.id)}
							// A classe "morph-item" e o data-flip-id (que usa a mesma chave) conectam as origens e destinos!
							className="morph-item aspect-[4/5] rounded-3xl cursor-pointer overflow-hidden relative group"
							data-flip-id={`card-${card.id}`}
						>
							<div className="morph-bg absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10 group-hover:bg-white/10 transition-colors z-10" data-flip-id={`bg-${card.id}`} />
							<Image src={card.img} alt={card.title} fill className="morph-img object-cover opacity-60 mix-blend-screen scale-110 group-hover:scale-100 transition-transform duration-700" data-flip-id={`img-${card.id}`} />
							<div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
								<span className="text-[10px] uppercase font-mono tracking-widest text-indigo-300 mb-2 block morph-text" data-flip-id={`cat-${card.id}`}>
									{card.category}
								</span>
								<h3 className="text-lg font-bold text-white leading-tight morph-text" data-flip-id={`title-${card.id}`}>
									{card.title}
								</h3>
							</div>
							<div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
								<Maximize className="w-4 h-4 text-white" />
							</div>
						</div>
					))}
				</div>

				{/* Camada do Elemento Ativo (Estado 2) */}
				<div className={`absolute inset-0 flex items-center justify-center z-50 pointer-events-none ${activeCard !== null ? 'opacity-100' : 'opacity-0'}`}>
					{CARDS.map((card) => (
						activeCard === card.id && (
							<div
								key={`active-${card.id}`}
								// Quando ativo, ele ocupa outra posição (centro) e formato (w-full h-[600px] arredondado menor)
								className="morph-item w-full h-[80vh] md:h-[700px] rounded-[3rem] overflow-hidden relative pointer-events-auto shadow-[0_0_80px_rgba(99,102,241,0.2)]"
								data-flip-id={`card-${card.id}`}
							>
								<div className="morph-bg absolute inset-0 bg-indigo-950/40 backdrop-blur-xl border border-white/10 z-10" data-flip-id={`bg-${card.id}`} />
								<Image src={card.img} alt={card.title} fill className="morph-img object-cover opacity-40 mix-blend-screen" data-flip-id={`img-${card.id}`} />
								
								<button 
									onClick={() => handleCardClick(null)}
									className="absolute top-6 right-6 z-30 w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center transition-colors cursor-pointer"
								>
									<X className="w-5 h-5 text-white" />
								</button>

								<div className="absolute inset-0 p-12 flex flex-col justify-end z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
									<div className="max-w-2xl">
										<span className="text-xs uppercase font-mono tracking-widest text-indigo-400 mb-4 block morph-text" data-flip-id={`cat-${card.id}`}>
											{card.category}
										</span>
										<h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6 morph-text" data-flip-id={`title-${card.id}`}>
											{card.title}
										</h2>
										
										{/* Conteúdo adicional que surge via onEnter da timeline do Flip */}
										<div className="space-y-4 text-neutral-300 text-sm md:text-base leading-relaxed border-t border-white/10 pt-6 mt-6">
											<p>
												Ao invés de manipular o layout em cada tick da animação (o que causa reflows pesados no navegador e queda de FPS), o plugin usa cálculos vetoriais.
											</p>
											<p>
												O algoritmo FLIP calcula matematicamente as diferenças de posição e escalas <code>(Invert)</code>, e as aplica via transformações compostas na GPU <code>(Play)</code>. O resultado é um morphing indetectável da substituição real das divs do DOM.
											</p>
										</div>
									</div>
								</div>
							</div>
						)
					))}
				</div>
			</div>
		</div>
	);
}
