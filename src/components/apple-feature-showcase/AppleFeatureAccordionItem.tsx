import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { FeatureItem } from '../../types/feature';
import { SPRING_TRANSITION } from '../../constants/animations';

interface AppleFeatureAccordionItemProps {
	feature: FeatureItem;
	isActive: boolean;
	onSelect: (id: string) => void;
}

export const AppleFeatureAccordionItem: React.FC<AppleFeatureAccordionItemProps> = ({
	feature,
	isActive,
	onSelect,
}) => {
	return (
		<motion.button
			layout
			onClick={() => onSelect(feature.id)}
			role="tab"
			aria-selected={isActive}
			aria-controls={`panel-${feature.id}`}
			id={`tab-${feature.id}`}
			initial={false}
			transition={SPRING_TRANSITION}
			className={`relative overflow-hidden text-left block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 border border-transparent transition-colors ${isActive
				? 'bg-black/40 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] w-full border-white/10'
				: 'bg-black/40 backdrop-blur-md p-3 px-5 rounded-full w-fit hover:bg-white/10'
				}`}
		>
			<motion.div layout className="flex items-start gap-4">
				<AnimatePresence mode="popLayout" initial={false}>
					{!isActive && (
						<motion.div
							layout
							key="plus-icon"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							transition={SPRING_TRANSITION}
							className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center flex-shrink-0"
						>
							<Plus className="w-4 h-4 text-white" />
						</motion.div>
					)}
				</AnimatePresence>

				<motion.div layout className="flex-1 min-w-0">
					<motion.p layout className="leading-relaxed">
						<motion.span
							layout
							layoutId={`${feature.id}-title`}
							transition={SPRING_TRANSITION}
							className={`inline-block font-medium ${isActive
								? 'text-white text-lg md:text-xl font-bold'
								: 'text-[#86868b] text-base md:text-lg'
								}`}
						>
							{feature.title}{isActive ? '.' : ''}
						</motion.span>
						{isActive && (
							<motion.span
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ ...SPRING_TRANSITION, delay: 0.1 }}
								className="text-white/80 text-lg md:text-xl font-medium ml-1.5"
							>
								{feature.description}
							</motion.span>
						)}
					</motion.p>
				</motion.div>
			</motion.div>
		</motion.button>
	);
};
