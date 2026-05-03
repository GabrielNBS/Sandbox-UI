'use client';

import { Box, MousePointer2, Type } from 'lucide-react';
import { useEffect } from 'react';
import { SandboxProvider, useSandbox } from '@/components/SandboxProvider';
import { SandboxUI } from '@/components/SandboxUI';
import { AppleFeatureShowcase } from '@/components/apple-feature-showcase';
import { FEATURES } from '@/data/features';
import { Sparkles } from 'lucide-react';

// --- Example Experiments ---

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

// --- Registration Logic ---

function SandboxManager() {
	const { registerExperiment } = useSandbox();

	useEffect(() => {
		registerExperiment({
			id: 'buttons',
			name: 'Button Styles',
			description: 'Testing various interactive button variants',
			component: ButtonExperiment,
			icon: <MousePointer2 className="w-5 h-5 text-indigo-400" />,
		});
		registerExperiment({
			id: 'typography',
			name: 'Typography System',
			description: 'Global font scales and heading styles',
			component: TypographyExperiment,
			icon: <Type className="w-5 h-5 text-emerald-400" />,
		});
		registerExperiment({
			id: 'cards',
			name: 'Premium Cards',
			description: 'Glassmorphism card layouts with hover states',
			component: CardExperiment,
			icon: <Box className="w-5 h-5 text-purple-400" />,
		});
		registerExperiment({
			id: 'apple-showcase',
			name: 'Apple Showcase',
			description: 'Interactive accordion specifications with smooth transitions',
			component: () => <AppleFeatureShowcase features={FEATURES} />,
			icon: <Sparkles className="w-5 h-5 text-amber-400" />,
		});
	}, [registerExperiment]);

	return <SandboxUI />;
}

export default function Home() {
	return (
		<SandboxProvider>
			<SandboxManager />
		</SandboxProvider>
	);
}
