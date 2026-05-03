'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Command, Search, Zap } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { type SandboxExperiment, useSandbox } from './SandboxProvider';

export function SandboxNavigator() {
	const { experiments, activeExperiment, setActiveExperiment } = useSandbox();
	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useState('');

	const filteredExperiments = experiments.filter((e) =>
		e.name.toLowerCase().includes(search.toLowerCase())
	);

	const handleKeyDown = useCallback((e: KeyboardEvent) => {
		if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
			e.preventDefault();
			setIsOpen((prev) => !prev);
		}
		if (e.key === 'Escape') {
			setIsOpen(false);
		}
	}, []);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [handleKeyDown]);

	const selectExperiment = (exp: SandboxExperiment) => {
		setActiveExperiment(exp);
		setIsOpen(false);
		setSearch('');
	};

	return (
		<>
			{/* Floating Toggle Button */}
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className="fixed bottom-6 right-6 p-4 glass rounded-2xl hover:scale-105 transition-all group z-50"
				title="Open Navigator (Cmd+K)"
			>
				<Command className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
			</button>

			<AnimatePresence>
				{isOpen && (
					<div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsOpen(false)}
							className="absolute inset-0 bg-black/60 backdrop-blur-sm"
						/>

						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: -20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: -20 }}
							className="relative w-full max-w-2xl glass rounded-2xl overflow-hidden border border-white/10"
						>
							<div className="flex items-center p-4 border-b border-white/5">
								<Search className="w-5 h-5 text-white/40 mr-3" />
								<input
									placeholder="Search experiments..."
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder:text-white/20"
								/>
								<div className="flex items-center gap-2 px-2 py-1 bg-white/5 rounded-md border border-white/10">
									<span className="text-[10px] text-white/40 uppercase font-medium">
										ESC to close
									</span>
								</div>
							</div>

							<div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
								{filteredExperiments.length > 0 ? (
									filteredExperiments.map((exp) => (
										<button
											type="button"
											key={exp.id}
											onClick={() => selectExperiment(exp)}
											className={`w-full flex items-center p-3 rounded-xl transition-all group ${
												activeExperiment?.id === exp.id
													? 'bg-white/10 border border-white/10'
													: 'hover:bg-white/5'
											}`}
										>
											<div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
												{exp.icon || <Zap className="w-5 h-5 text-white/60" />}
											</div>
											<div className="text-left">
												<h3 className="text-white font-medium">{exp.name}</h3>
												{exp.description && (
													<p className="text-white/40 text-sm">{exp.description}</p>
												)}
											</div>
										</button>
									))
								) : (
									<div className="p-8 text-center text-white/20">
										<p>No experiments found matching "{search}"</p>
									</div>
								)}
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</>
	);
}
