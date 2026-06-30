import type { Transition } from 'framer-motion';

export const SPRING_TRANSITION: Transition = {
	type: 'spring',
	stiffness: 260,
	damping: 30,
	mass: 1,
};

export const FADE_SCALE_TRANSITION: Transition = {
	duration: 0.4,
	ease: 'easeInOut',
};
