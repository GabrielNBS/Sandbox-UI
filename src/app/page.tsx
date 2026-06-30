'use client';

import { type Variants, motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Terminal } from 'lucide-react';
import Link from 'next/link';
import { experiments } from '@/data/experiments';

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.05,
		},
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};


export default function Home() {

	return (
		<div className="w-full max-w-6xl py-12 px-4 space-y-16">
			{/* Hero / Header Section */}
			<div className="text-center space-y-6 max-w-3xl mx-auto">
				<motion.div
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ type: 'spring', duration: 0.6 }}
					className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto shadow-xl shadow-black/20"
				>
					<Terminal className="w-8 h-8 text-indigo-400" />
				</motion.div>
				<div className="space-y-3">
					<motion.h1
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-4xl md:text-6xl font-extrabold tracking-tight font-outfit text-white"
					>
						Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Sandbox</span>
					</motion.h1>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.1 }}
						className="text-lg text-white/50"
					>
						A premium testing ground for layout designs, animations, and micro-interactions.
					</motion.p>
				</div>
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60"
				>
					<Sparkles className="w-3.5 h-3.5 text-amber-400" />
					Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded border border-white/15 mx-1 font-mono text-[10px]">Cmd + K</kbd> anywhere to open navigator
				</motion.div>
			</div>

			{/* Grid Section */}
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="show"
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
			>
				{experiments.map((exp) => (
					<motion.div
						key={exp.id}
						variants={itemVariants}
						whileHover={{ y: -6, transition: { duration: 0.2 } }}
						className="group relative"
					>
						<Link href={`/${exp.id}`} className="block h-full">
							<div className="h-full glass rounded-[2rem] p-6 border border-white/5 hover:border-white/20 hover:bg-white/[0.03] transition-all flex flex-col justify-between group-hover:shadow-2xl group-hover:shadow-indigo-500/5">
								<div>
									<div className="flex items-center justify-between mb-6">
										<div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-500/10 group-hover:text-indigo-400 text-white/70 transition-all duration-300">
											{exp.icon || <Sparkles className="w-6 h-6" />}
										</div>
										<ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
									</div>
									<h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-indigo-300 transition-colors">
										{exp.name}
									</h3>
									<p className="text-white/40 text-sm leading-relaxed mb-4">
										{exp.description || 'No description provided.'}
									</p>
								</div>
								
								{exp.fullWidth && (
									<div className="mt-4 pt-4 border-t border-white/5">
										<span className="text-[10px] uppercase font-bold tracking-wider text-pink-400 bg-pink-400/5 px-2 py-1 rounded">
											Full Width Layout
										</span>
									</div>
								)}
							</div>
						</Link>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
}
