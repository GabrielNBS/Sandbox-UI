'use client';

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Code2, ExternalLink, X } from 'lucide-react';
import { useState } from 'react';

interface Project {
	id: string;
	title: string;
	category: string;
	description: string;
	image: string;
	color: string;
	tags: string[];
}

const projects: Project[] = [
	{
		id: '1',
		title: 'Quantum Nexus',
		category: 'Blockchain Infrastructure',
		description:
			'A decentralized computing platform that leverages quantum-resistant algorithms to secure global transactions at scale.',
		image: '/projects/project1.png',
		color: '#8b5cf6',
		tags: ['Rust', 'Web3', 'Cryptography'],
	},
	{
		id: '2',
		title: 'Liquid Flow',
		category: 'Dynamic UI System',
		description:
			'An experimental design system focusing on fluid animations and responsive physics-based layouts for high-performance dashboards.',
		image: '/projects/project2.png',
		color: '#10b981',
		tags: ['React', 'Framer Motion', 'GLSL'],
	},
	{
		id: '3',
		title: 'Cerebro AI',
		category: 'Neural Interfaces',
		description:
			'Deep learning toolkit for real-time neural data analysis and visualization, bridging the gap between brain-computer interfaces and AI.',
		image: '/projects/project3.png',
		color: '#ef4444',
		tags: ['Python', 'TensorFlow', 'D3.js'],
	},
	{
		id: '4',
		title: 'Horizon OS',
		category: 'Cloud Operating System',
		description:
			'A cloud-native operating system designed for edge computing environments with built-in zero-trust security architecture.',
		image: '/projects/project4.png',
		color: '#0ea5e9',
		tags: ['Go', 'Kubernetes', 'Linux'],
	},
];

const SPRING_CONFIG = { stiffness: 150, damping: 25, mass: 0.5 };

export default function ProjectShowcase3D() {
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const selectedProject = projects.find((p) => p.id === selectedId);

	return (
		<div className="w-full max-w-5xl mx-auto py-12 px-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
				{projects.map((project) => (
					<ProjectCard
						key={project.id}
						project={project}
						isSelected={selectedId === project.id}
						onSelect={() => setSelectedId(project.id)}
					/>
				))}
			</div>

			<AnimatePresence>
				{selectedId && selectedProject && (
					<ProjectDetail project={selectedProject} onClose={() => setSelectedId(null)} />
				)}
			</AnimatePresence>
		</div>
	);
}

function ProjectCard({
	project,
	onSelect,
	isSelected,
}: {
	project: Project;
	onSelect: () => void;
	isSelected: boolean;
}) {
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const mouseXSpring = useSpring(x, SPRING_CONFIG);
	const mouseYSpring = useSpring(y, SPRING_CONFIG);

	const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
	const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

	function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
		const rect = e.currentTarget.getBoundingClientRect();
		const width = rect.width;
		const height = rect.height;
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;

		const xPct = mouseX / width - 0.5;
		const yPct = mouseY / height - 0.5;

		x.set(xPct);
		y.set(yPct);
	}

	function handleMouseLeave() {
		x.set(0);
		y.set(0);
	}

	return (
		<motion.div
			layoutId={`card-${project.id}`}
			className="relative aspect-[4/3] cursor-pointer group"
			onClick={onSelect}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{
				perspective: '1000px',
			}}
		>
			<motion.div
				style={{
					rotateX,
					rotateY,
					transformStyle: 'preserve-3d',
				}}
				className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/5"
			>
				{/* Background Image with Shared Element */}
				<motion.img
					layoutId={`image-${project.id}`}
					src={project.image}
					alt={project.title}
					className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
				/>

				{/* Overlay Gradient */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

				{/* Floating Content (3D effect) */}
				<div
					className="absolute inset-0 p-8 flex flex-col justify-end"
					style={{ transform: 'translateZ(50px)' }}
				>
					<motion.span
						layoutId={`category-${project.id}`}
						className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2 block"
					>
						{project.category}
					</motion.span>
					<motion.h3
						layoutId={`title-${project.id}`}
						className="text-2xl font-black text-white mb-4 tracking-tighter"
					>
						{project.title}
					</motion.h3>

					<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						{project.tags.slice(0, 2).map((tag) => (
							<span
								key={tag}
								className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white/70 uppercase"
							>
								{tag}
							</span>
						))}
					</div>
				</div>

				{/* Glow effect on hover */}
				<motion.div
					className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
					style={{
						background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${project.color}22, transparent 80%)`,
					}}
				/>
			</motion.div>
		</motion.div>
	);
}

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
	return (
		<>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				onClick={onClose}
				className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-[60] cursor-zoom-out"
			/>

			<div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-12 pointer-events-none">
				<motion.div
					layoutId={`card-${project.id}`}
					className="w-full max-w-6xl bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10 pointer-events-auto flex flex-col md:flex-row relative"
					transition={{ type: 'spring', ...SPRING_CONFIG }}
				>
					{/* Close Button */}
					<button
						onClick={onClose}
						className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-colors z-20"
					>
						<X className="w-5 h-5" />
					</button>

					{/* Left: Visuals */}
					<div className="w-full md:w-3/5 h-64 md:h-auto relative overflow-hidden bg-black">
						<motion.img
							layoutId={`image-${project.id}`}
							src={project.image}
							alt={project.title}
							className="absolute inset-0 w-full h-full object-cover opacity-80"
						/>
						<div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent md:bg-gradient-to-b md:from-transparent md:to-black/60" />

						<div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
							<motion.span
								layoutId={`category-${project.id}`}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}
								className="text-sm font-bold uppercase tracking-[0.2em] text-white/40 mb-3 block"
							>
								{project.category}
							</motion.span>
							<motion.h2
								layoutId={`title-${project.id}`}
								className="text-4xl md:text-6xl font-black text-white tracking-tighter"
							>
								{project.title}
							</motion.h2>
						</div>
					</div>

					{/* Right: Content */}
					<div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center">
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.3 }}
							className="space-y-8"
						>
							<div>
								<h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">
									About Project
								</h4>
								<p className="text-white/60 leading-relaxed text-lg font-medium">
									{project.description}
								</p>
							</div>

							<div>
								<h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">
									Tech Stack
								</h4>
								<div className="flex flex-wrap gap-3">
									{project.tags.map((tag, i) => (
										<motion.span
											key={tag}
											initial={{ opacity: 0, scale: 0.8 }}
											animate={{ opacity: 1, scale: 1 }}
											transition={{ delay: 0.4 + i * 0.1 }}
											className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-white/80"
										>
											{tag}
										</motion.span>
									))}
								</div>
							</div>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.6 }}
								className="flex flex-col sm:flex-row gap-4 pt-4"
							>
								<button className="flex-1 px-8 py-4 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition-colors shadow-xl shadow-white/5">
									Launch Project <ArrowRight className="w-4 h-4" />
								</button>
								<div className="flex gap-4">
									<button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
										<Code2 className="w-5 h-5" />
									</button>
									<button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
										<ExternalLink className="w-5 h-5" />
									</button>
								</div>
							</motion.div>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</>
	);
}
