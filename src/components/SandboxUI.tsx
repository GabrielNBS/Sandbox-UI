'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FlaskConical, Layout } from 'lucide-react';
import { SandboxNavigator } from './SandboxNavigator';
import { useSandbox } from './SandboxProvider';

export function SandboxUI() {
	const { activeExperiment } = useSandbox();

	return (
		<div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-white/10">
			{/* Top Bar */}
			<header className="h-16 border-b border-white/5 px-6 flex items-center justify-between glass z-10 sticky top-0">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
						<FlaskConical className="w-5 h-5 text-white" />
					</div>
					<div>
						<h1 className="text-sm font-semibold tracking-tight gradient-text">Next.js Sandbox</h1>
						<p className="text-[10px] text-white/40 font-medium uppercase tracking-widest">
							Isolated Development Environment
						</p>
					</div>
				</div>

				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2 px-3 py-1.5 glass rounded-full border-white/5">
						<div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
						<span className="text-xs font-medium text-white/60">Live Preview</span>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="flex-1 relative overflow-hidden flex flex-col items-center justify-center p-8">
				<AnimatePresence mode="wait">
					{activeExperiment ? (
						<motion.div
							key={activeExperiment.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3, ease: 'easeOut' }}
							className="w-full max-w-6xl"
						>
							<div className="mb-8">
								<div className="flex items-center gap-2 text-white/40 mb-2">
									<Layout className="w-4 h-4" />
									<span className="text-xs font-medium uppercase tracking-wider">Experiment</span>
								</div>
								<h2 className="text-3xl font-bold text-white tracking-tight">
									{activeExperiment.name}
								</h2>
								{activeExperiment.description && (
									<p className="text-white/40 mt-1">{activeExperiment.description}</p>
								)}
							</div>

							<div className="glass rounded-3xl p-8 min-h-[400px] flex items-center justify-center overflow-hidden border border-white/5 shadow-inner">
								<activeExperiment.component />
							</div>
						</motion.div>
					) : (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="text-center space-y-6"
						>
							<div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mx-auto border border-white/10">
								<Command className="w-10 h-10 text-white/20" />
							</div>
							<div>
								<h2 className="text-2xl font-bold text-white tracking-tight">Empty Sandbox</h2>
								<p className="text-white/40 max-w-sm mx-auto mt-2">
									Press{' '}
									<kbd className="px-2 py-1 bg-white/10 rounded border border-white/10 text-xs mx-1">
										Cmd + K
									</kbd>{' '}
									to open the navigator and start testing components.
								</p>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</main>

			<SandboxNavigator />
		</div>
	);
}

function Command({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
		</svg>
	);
}
