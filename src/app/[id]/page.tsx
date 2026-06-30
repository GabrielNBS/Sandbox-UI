'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { Layout, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { experiments } from '@/data/experiments';
import { useSandbox } from '@/components/SandboxProvider';

interface PageProps {
	params: Promise<{ id: string }>;
}

export default function ExperimentPage({ params }: PageProps) {
	const { id } = use(params);
	const { navigateWithTransition } = useSandbox();

	const experiment = experiments.find((e) => e.id === id);

	if (!experiment) {
		notFound();
	}

	const ExperimentComponent = experiment.component;

	return (
		<motion.div
			key={experiment.id}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.3, ease: 'easeOut' }}
			className={`w-full ${experiment.fullWidth ? 'h-auto' : 'h-full'} flex flex-col ${
				experiment.fullWidth ? 'max-w-none' : 'max-w-6xl'
			}`}
		>
			{!experiment.fullWidth && (
				<div className="mb-8 flex flex-col gap-4">
					<div>
						<Link
							href="/"
							onClick={(e) => {
								e.preventDefault();
								navigateWithTransition('/');
							}}
							className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/40 hover:text-white transition-colors group mb-4"
						>
							<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
							Back to dashboard
						</Link>
					</div>
					<div>
						<div className="flex items-center gap-2 text-white/40 mb-2">
							{experiment.icon || <Layout className="w-4 h-4" />}
							<span className="text-xs font-medium uppercase tracking-wider">Experiment</span>
						</div>
						<h2 className="text-3xl font-bold text-white tracking-tight">
							{experiment.name}
						</h2>
						{experiment.description && (
							<p className="text-white/40 mt-1">{experiment.description}</p>
						)}
					</div>
				</div>
			)}

			<div
				className={`${
					experiment.fullWidth
						? 'w-full h-auto'
						: 'glass rounded-3xl p-8 min-h-[400px] border border-white/5 shadow-inner'
				} flex items-center justify-center overflow-x-hidden`}
			>
				<ExperimentComponent />
			</div>
		</motion.div>
	);
}
