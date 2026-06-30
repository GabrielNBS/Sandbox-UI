'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import React, { useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import barba from '@barba/core';
import { SandboxNavigator } from './SandboxNavigator';
import { useSandbox } from './SandboxProvider';

export function SandboxLayout({ children }: { children: React.ReactNode }) {
	const { activeExperiment } = useSandbox();
	const pathname = usePathname();
	const containerRef = useRef<HTMLDivElement>(null);
	const isFirstMount = useRef(true);

	// Inicializa o Barba.js no cliente de forma dinâmica
	useEffect(() => {
		const initBarba = async () => {
			if (typeof window !== 'undefined') {
				const { default: barba } = await import('@barba/core');
				barba.init({
					prevent: () => true, // Não intercepta cliques automaticamente para manter o controle com o router do Next.js
					transitions: [
						{
							name: 'sandbox-transition',
							sync: true, // Sincroniza as transições de entrada e saída
							once(data: any) {
								const overlay = document.getElementById('intro-overlay');
								const logo = overlay?.querySelector('.logo-wrapper');
								
								// Bloqueia rolagem durante a introdução
								if (typeof window !== 'undefined') {
									document.documentElement.style.overflowY = 'hidden';
									document.body.style.overflowY = 'hidden';
								}

								if (!overlay || !logo) {
									if (typeof window !== 'undefined') {
										document.documentElement.classList.add('show-scrollbar');
									}
									gsap.fromTo(data.next.container,
										{ opacity: 0, y: 30, scale: 0.98 },
										{ 
											opacity: 1, 
											y: 0, 
											scale: 1, 
											duration: 0.6, 
											ease: 'power2.out',
											clearProps: 'all',
											onComplete: () => {
												if (typeof window !== 'undefined') {
													document.documentElement.style.overflowY = '';
													document.body.style.overflowY = '';
												}
											}
										}
									);
									return;
								}

								// Timeline da primeira entrada (Once)
								const tl = gsap.timeline({
									onComplete: () => {
										overlay.style.display = 'none';
										if (typeof window !== 'undefined') {
											document.documentElement.classList.add('show-scrollbar');
										}
									}
								});

								tl.fromTo(logo,
									{ opacity: 0, scale: 0.85, y: 15 },
									{ opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'power3.out' }
								)
								.to(logo, {
									opacity: 0,
									y: -20,
									scale: 0.95,
									duration: 0.4,
									ease: 'power3.in',
									delay: 0.4
								})
								.to(overlay, {
									yPercent: -100,
									duration: 0.6,
									ease: 'power3.inOut',
								}, '-=0.15')
								.fromTo(data.next.container,
									{ opacity: 0, y: 30, scale: 0.98 },
									{ 
										opacity: 1, 
										y: 0, 
										scale: 1, 
										duration: 0.6, 
										ease: 'power2.out',
										clearProps: 'all',
										onComplete: () => {
											if (typeof window !== 'undefined') {
												document.documentElement.style.overflowY = '';
												document.body.style.overflowY = '';
											}
										}
									},
									'-=0.4'
								);
							},
							leave(data: any) {
								// Animação de saída (Leave)
								return gsap.to(data.current.container, {
									opacity: 0,
									y: -15,
									duration: 0.3,
									ease: 'power2.in',
								});
							},
							enter(data: any) {
								// Animação de entrada (Enter)
								return gsap.fromTo(
									data.next.container,
									{ opacity: 0, y: 45 },
									{
										opacity: 1,
										y: 0,
										duration: 0.4,
										ease: 'power2.out',
										clearProps: 'all',
										onComplete: () => {
											if (typeof window !== 'undefined') {
												document.documentElement.style.overflowY = '';
												document.body.style.overflowY = '';
												setTimeout(() => {
													document.documentElement.classList.add('show-scrollbar');
												}, 100);
											}
										},
									}
								);
							},
						},
					],
				});
				(window as any).barba = barba;
			}
		};
		initBarba();
	}, []);

	// Executa a animação de entrada com base nos hooks do Barba na troca de rota
	useGSAP(() => {
		// Evita rodar no primeiro carregamento, deixando o hook "once" do Barba gerenciar a animação
		if (isFirstMount.current) {
			isFirstMount.current = false;
			return;
		}

		if (containerRef.current) {
			// Bloqueia a rolagem no html e body no início da animação de entrada
			if (typeof window !== 'undefined') {
				document.documentElement.classList.remove('show-scrollbar');
				document.documentElement.style.overflowY = 'hidden';
				document.body.style.overflowY = 'hidden';
			}

			const activeTransition = typeof window !== 'undefined'
				? (window as any).barba?.transitions?.all?.[0]
				: undefined;
			const fakeData = {
				current: { container: null as any },
				next: { container: containerRef.current },
				trigger: 'barba',
			} as any;

			if (activeTransition?.enter) {
				Promise.resolve(activeTransition.enter(fakeData));
			} else {
				// Fallback caso Barba.js ainda não tenha inicializado
				gsap.fromTo(
					containerRef.current,
					{ opacity: 0, y: 45 },
					{
						opacity: 1,
						y: 0,
						duration: 0.4,
						ease: 'power2.out',
						clearProps: 'all',
						onComplete: () => {
							if (typeof window !== 'undefined') {
								document.documentElement.style.overflowY = '';
								document.body.style.overflowY = '';
								setTimeout(() => {
									document.documentElement.classList.add('show-scrollbar');
								}, 100);
							}
						},
					}
				);
			}
		}
	}, [pathname]);

	return (
		<div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-white/10" data-barba="wrapper">
			{/* Intro Overlay para animação 'once' */}
			<div
				id="intro-overlay"
				className="fixed inset-0 bg-background z-[200] flex items-center justify-center pointer-events-none"
			>
				<div className="logo-wrapper flex flex-col items-center gap-4 text-center opacity-0">
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
				</div>
			</div>

			{/* Main Content */}
			<main
				id="sandbox-content-container"
				data-barba="container"
				data-barba-namespace="sandbox"
				ref={containerRef}
				className={`flex-1 relative overflow-x-hidden flex flex-col items-center justify-center ${
					activeExperiment?.fullWidth ? 'p-0 font-sans' : 'p-8 font-sans'
				}`}
			>
				{children}
			</main>

			<SandboxNavigator />
		</div>
	);
}
export default SandboxLayout;
