'use client';

import { createContext, type ReactNode, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { type SandboxExperiment, experiments } from '@/data/experiments';

interface SandboxContextType {
	activeExperiment: SandboxExperiment | null;
	experiments: SandboxExperiment[];
	setActiveExperiment: (experiment: SandboxExperiment | null) => void;
}

const SandboxContext = createContext<SandboxContextType | undefined>(undefined);

export function SandboxProvider({ children }: { children: ReactNode }) {
	const pathname = usePathname();
	const router = useRouter();

	// O pathname do Next.js começa com "/" (ex: "/shared-element").
	// Se for apenas "/", não há experimento ativo.
	const activeId = pathname === '/' ? '' : pathname.slice(1);
	const activeExperiment = experiments.find((e) => e.id === activeId) || null;

	const setActiveExperiment = (experiment: SandboxExperiment | null) => {
		if (experiment) {
			router.push(`/${experiment.id}`);
		} else {
			router.push('/');
		}
	};

	return (
		<SandboxContext.Provider
			value={{
				activeExperiment,
				experiments,
				setActiveExperiment,
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
