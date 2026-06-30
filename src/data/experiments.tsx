'use client';

import {
	Box,
	LayoutGrid,
	Maximize2,
	MousePointer2,
	Sparkles,
	Type,
	Video,
	Zap,
} from 'lucide-react';
import React from 'react';

import { AppleFeatureShowcase } from '@/components/apple-feature-showcase';
import BlankPlayground from '@/components/BlankPlayground';
import EmptyTemplate from '@/components/EmptyTemplate';
import GalleryProjectShowcase from '@/components/GalleryProjectShowcase';
import GsapPlayground from '@/components/GsapPlayground';
import ProjectShowcase3D from '@/components/ProjectShowcase3D';
import SharedElementTransition from '@/components/SharedElementTransition';
import VideoIconTemplate from '@/components/VideoIconTemplate';
import { FEATURES } from '@/data/features';

export interface SandboxExperiment {
	id: string;
	name: string;
	description?: string;
	component: React.ComponentType;
	icon?: React.ReactNode;
	fullWidth?: boolean;
}

// --- Small Inline Experiments ---

function ButtonExperiment() {
	return (
		<div className="space-y-6 text-center">
			<div className="flex flex-wrap justify-center gap-4">
				<button
					type="button"
					className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10"
				>
					Primary Action
				</button>
				<button
					type="button"
					className="px-6 py-3 glass text-white font-bold rounded-xl hover:bg-white/10 transition-all border border-white/10"
				>
					Secondary Action
				</button>
				<button
					type="button"
					className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20"
				>
					Special Button
				</button>
			</div>
			<p className="text-white/40 text-sm italic">
				Testing hover effects and premium button styles
			</p>
		</div>
	);
}

function TypographyExperiment() {
	return (
		<div className="max-w-md space-y-4">
			<h1 className="text-4xl font-black tracking-tighter text-white">The Quick Brown Fox</h1>
			<p className="text-xl text-white/60 leading-relaxed">
				Designing systems that feel fluid and natural is the core of modern UI development.
			</p>
			<div className="p-4 bg-white/5 rounded-xl border border-white/5 font-mono text-xs text-emerald-400">
				const philosophy = "Code as art";
			</div>
		</div>
	);
}

function CardExperiment() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
			{[1, 2].map((i) => (
				<div
					key={i}
					className="group glass p-6 rounded-[2rem] border border-white/5 hover:border-white/20 transition-all"
				>
					<div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
						<Box className="w-6 h-6 text-indigo-400" />
					</div>
					<h3 className="text-xl font-bold text-white mb-2">Feature Module {i}</h3>
					<p className="text-white/40 text-sm leading-relaxed mb-4">
						Implementing complex logic inside isolated components allows for better scalability and
						testability.
					</p>
					<div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider cursor-pointer">
						Learn More <span>→</span>
					</div>
				</div>
			))}
		</div>
	);
}

// --- Global Experiments Registry ---

export const experiments: SandboxExperiment[] = [
	{
		id: 'buttons',
		name: 'Button Styles',
		description: 'Testing various interactive button variants',
		component: ButtonExperiment,
		icon: <MousePointer2 className="w-5 h-5 text-indigo-400" />,
	},
	{
		id: 'typography',
		name: 'Typography System',
		description: 'Global font scales and heading styles',
		component: TypographyExperiment,
		icon: <Type className="w-5 h-5 text-emerald-400" />,
	},
	{
		id: 'cards',
		name: 'Premium Cards',
		description: 'Glassmorphism card layouts with hover states',
		component: CardExperiment,
		icon: <Box className="w-5 h-5 text-purple-400" />,
	},
	{
		id: 'apple-showcase',
		name: 'Apple Showcase',
		description: 'Interactive accordion specifications with smooth transitions',
		component: () => <AppleFeatureShowcase features={FEATURES} />,
		icon: <Sparkles className="w-5 h-5 text-amber-400" />,
	},
	{
		id: 'shared-element',
		name: 'Shared Element',
		description: 'Advanced layout animations with shared element transitions',
		component: SharedElementTransition,
		icon: <Maximize2 className="w-5 h-5 text-pink-400" />,
	},
	{
		id: 'portfolio-3d',
		name: '3D Portfolio Grid',
		description: 'Dynamic project showcase with 3D perspective and shared element expansion',
		component: ProjectShowcase3D,
		icon: <LayoutGrid className="w-5 h-5 text-cyan-400" />,
	},
	{
		id: 'gallery-showcase',
		name: 'Gallery Showcase',
		description: 'Premium split-layout gallery with dynamic content tabs and navbar navigation',
		component: GalleryProjectShowcase,
		icon: <LayoutGrid className="w-5 h-5 text-rose-400" />,
		fullWidth: true,
	},
	{
		id: 'gsap-playground',
		name: 'GSAP Playground',
		description: 'Espaço dedicado para testar e aprender animações com o GSAP',
		component: GsapPlayground,
		icon: <Zap className="w-5 h-5 text-indigo-400" />,
		fullWidth: true,
	},
	{
		id: 'blank-playground',
		name: 'Novo Template',
		description: 'Espaço em branco configurado para novos testes e experimentos',
		component: BlankPlayground,
		icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
		fullWidth: true,
	},
	{
		id: 'video-icon-template',
		name: 'Video Icon Hover',
		description: 'Template com ícone de vídeo reproduzindo no hover',
		component: VideoIconTemplate,
		icon: <Video className="w-5 h-5 text-indigo-400" />,
		fullWidth: true,
	},
	{
		id: 'empty-template',
		name: 'Template Vazio',
		description: 'Um novo espaço totalmente em branco e limpo',
		component: EmptyTemplate,
		icon: <Sparkles className="w-5 h-5 text-neutral-400" />,
		fullWidth: true,
	},
];
