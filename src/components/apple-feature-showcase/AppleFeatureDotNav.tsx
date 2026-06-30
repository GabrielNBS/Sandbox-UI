import { motion } from 'framer-motion';
import type React from 'react';
import { SPRING_TRANSITION } from '../../constants/animations';
import type { FeatureItem } from '../../types/feature';

interface AppleFeatureDotNavProps {
	features: FeatureItem[];
	activeId: string;
	onSelect: (id: string) => void;
}

export const AppleFeatureDotNav: React.FC<AppleFeatureDotNavProps> = ({
	features,
	activeId,
	onSelect,
}) => {
	return (
		<div
			className="hidden md:flex flex-col gap-4 z-20"
			role="tablist"
			aria-label="Navegação rápida Apple"
		>
			{features.map((feature) => (
				<button
					key={`dot-${feature.id}`}
					onClick={() => onSelect(feature.id)}
					className="group relative p-2 focus:outline-none"
					role="tab"
					aria-selected={activeId === feature.id}
					aria-label={`Mostrar ${feature.title}`}
					tabIndex={-1}
				>
					<div
						className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
							activeId === feature.id ? 'bg-white scale-150' : 'bg-white/20 group-hover:bg-white/40'
						}`}
					/>
					{activeId === feature.id && (
						<motion.div
							layoutId="active-dot-ring"
							className="absolute inset-0 border border-white/30 rounded-full"
							transition={SPRING_TRANSITION}
						/>
					)}
				</button>
			))}
		</div>
	);
};
