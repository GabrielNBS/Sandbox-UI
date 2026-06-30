'use client';

import { createContext, type ReactNode, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { type SandboxExperiment, experiments } from '@/data/experiments';

interface SandboxContextType {
	activeExperiment: SandboxExperiment | null;
	experiments: SandboxExperiment[];
	setActiveExperiment: (experiment: SandboxExperiment | null) => void;
	navigateWithTransition: (href: string) => void;
}

const SandboxContext = createContext<SandboxContextType | undefined>(undefined);

export function SandboxProvider({ children }: { children: ReactNode }) {
	const pathname = usePathname();
	const router = useRouter();

	// O pathname do Next.js começa com "/" (ex: "/shared-element").
	// Se for apenas "/", não há experimento ativo.
	const activeId = pathname === '/' ? '' : pathname.slice(1);
	const activeExperiment = experiments.find((e) => e.id === activeId) || null;

	const navigateWithTransition = (href: string) => {
		if (typeof window !== 'undefined') {
			document.documentElement.classList.remove('show-scrollbar');
			document.documentElement.style.overflowY = 'hidden';
			document.body.style.overflowY = 'hidden';
		}
		const container = document.getElementById('sandbox-content-container');
		const activeTransition = typeof window !== 'undefined'
			? (window as any).barba?.transitions?.all?.[0]
			: undefined;

		if (container && activeTransition?.leave) {
			const fakeData = {
				current: { container },
				next: { container: null as any },
				trigger: 'barba',
			} as any;

			// Executa a transição leave cadastrada no Barba.js
			Promise.resolve(activeTransition.leave(fakeData)).then(() => {
				router.push(href);
			});
		} else {
			// Fallback caso barba não tenha sido totalmente inicializado
			if (container) {
				gsap.to(container, {
					opacity: 0,
					y: -15,
					duration: 0.3,
					ease: 'power2.in',
					onComplete: () => {
						router.push(href);
					},
				});
			} else {
				router.push(href);
			}
		}
	};

	const setActiveExperiment = (experiment: SandboxExperiment | null) => {
		if (experiment) {
			navigateWithTransition(`/${experiment.id}`);
		} else {
			navigateWithTransition('/');
		}
	};

	return (
		<SandboxContext.Provider
			value={{
				activeExperiment,
				experiments,
				setActiveExperiment,
				navigateWithTransition,
			}}
		>
			{children}
		</SandboxContext.Provider>
	);
}

export function useSandbox() {
	const context = useContext(SandboxContext);
	if (context === undefined) {
		throw new Error('useSandbox must be used within a SandboxProvider');
	}
	return context;
}
