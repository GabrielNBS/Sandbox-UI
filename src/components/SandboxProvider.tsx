'use client';

import type React from 'react';
import { createContext, type ReactNode, useContext, useState } from 'react';

export interface SandboxExperiment {
	id: string;
	name: string;
	description?: string;
	component: React.ComponentType;
	icon?: React.ReactNode;
}

interface SandboxContextType {
	activeExperiment: SandboxExperiment | null;
	experiments: SandboxExperiment[];
	setActiveExperiment: (experiment: SandboxExperiment) => void;
	registerExperiment: (experiment: SandboxExperiment) => void;
}

const SandboxContext = createContext<SandboxContextType | undefined>(undefined);

export function SandboxProvider({ children }: { children: ReactNode }) {
	const [experiments, setExperiments] = useState<SandboxExperiment[]>([]);
	const [activeExperiment, setActiveExperiment] = useState<SandboxExperiment | null>(null);

	const registerExperiment = (experiment: SandboxExperiment) => {
		setExperiments((prev) => {
			if (prev.some((e) => e.id === experiment.id)) return prev;
			return [...prev, experiment];
		});
	};

	return (
		<SandboxContext.Provider
			value={{
				activeExperiment,
				experiments,
				setActiveExperiment,
				registerExperiment,
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
