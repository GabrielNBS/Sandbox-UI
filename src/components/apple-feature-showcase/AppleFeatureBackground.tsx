import { AnimatePresence, motion } from 'framer-motion';
import type React from 'react';
import { FADE_SCALE_TRANSITION } from '../../constants/animations';

interface AppleFeatureBackgroundProps {
	activeId: string;
	imageSrc: string;
}

export const AppleFeatureBackground: React.FC<AppleFeatureBackgroundProps> = ({
	activeId,
	imageSrc,
}) => {
	return (
		<div className="absolute inset-0 z-0">
			<AnimatePresence mode="wait">
				<motion.img
					key={activeId}
					initial={{ opacity: 0, scale: 1.05 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 1.05 }}
					transition={FADE_SCALE_TRANSITION}
					src={imageSrc}
					className="w-full h-full object-cover"
					alt=""
				/>
			</AnimatePresence>

			<div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent pointer-events-none" />
		</div>
	);
};
