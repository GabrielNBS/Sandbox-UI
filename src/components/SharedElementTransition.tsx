'use client';

import { AnimatePresence, motion, type Transition } from 'framer-motion';
import { useState } from 'react';

const SPRING: Transition = {
	type: 'spring',
	stiffness: 300,
	damping: 30,
	mass: 0.8,
};

const items = [
	{
		id: '1',
		label: 'Design System',
		emoji: '🎨',
		gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
		pillBg: 'rgba(139,92,246,0.12)',
		pillText: '#a78bfa',
		pillRing: 'rgba(139,92,246,0.25)',
		description:
			'A comprehensive design system with tokens, components, and patterns for building consistent user interfaces across platforms.',
		tags: ['Tokens', 'Components', 'Patterns'],
	},
	{
		id: '2',
		label: 'Motion Library',
		emoji: '✨',
		gradient: 'linear-gradient(135deg, #f59e0b, #ea580c)',
		pillBg: 'rgba(245,158,11,0.12)',
		pillText: '#fbbf24',
		pillRing: 'rgba(245,158,11,0.25)',
		description:
			'Production-ready animation library featuring spring physics, layout animations, and gesture recognition for delightful interactions.',
		tags: ['Spring', 'Layout', 'Gestures'],
	},
	{
		id: '3',
		label: 'Cloud Infra',
		emoji: '☁️',
		gradient: 'linear-gradient(135deg, #0ea5e9, #2563eb)',
		pillBg: 'rgba(14,165,233,0.12)',
		pillText: '#38bdf8',
		pillRing: 'rgba(14,165,233,0.25)',
		description:
			'Scalable cloud infrastructure with auto-scaling, edge computing, and zero-downtime deployments for modern applications.',
		tags: ['Scale', 'Edge', 'Deploy'],
	},
	{
		id: '4',
		label: 'AI Toolkit',
		emoji: '🤖',
		gradient: 'linear-gradient(135deg, #10b981, #0d9488)',
		pillBg: 'rgba(16,185,129,0.12)',
		pillText: '#34d399',
		pillRing: 'rgba(16,185,129,0.25)',
		description:
			'End-to-end machine learning toolkit with pre-trained models, fine-tuning pipelines, and inference optimization for production.',
		tags: ['Models', 'Training', 'Inference'],
	},
];

export default function SharedElementTransition() {
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const selectedItem = items.find((i) => i.id === selectedId);

	return (
		<div className="flex flex-col items-center justify-center p-8">
			{/* Pills */}
			<div className="flex flex-wrap gap-3 justify-center">
				{items.map((item) => (
					<motion.div
						key={item.id}
						layoutId={`container-${item.id}`}
						onClick={() => setSelectedId(item.id)}
						transition={SPRING}
						style={{
							borderRadius: 20,
							background: item.pillBg,
							boxShadow: `inset 0 0 0 1px ${item.pillRing}`,
							cursor: 'pointer',
							display: 'flex',
							alignItems: 'center',
							gap: 8,
							padding: '12px 20px',
						}}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.97 }}
					>
						<motion.span
							layoutId={`emoji-${item.id}`}
							transition={SPRING}
							style={{ fontSize: 18, lineHeight: 1 }}
						>
							{item.emoji}
						</motion.span>
						<motion.span
							layoutId={`label-${item.id}`}
							transition={SPRING}
							style={{
								fontSize: 14,
								fontWeight: 500,
								color: item.pillText,
								whiteSpace: 'nowrap',
							}}
						>
							{item.label}
						</motion.span>
					</motion.div>
				))}
			</div>

			{/* Expanded Card */}
			<AnimatePresence>
				{selectedId && selectedItem && (
					<>
						{/* Scrim */}
						<motion.div
							key="scrim"
							style={{
								position: 'fixed',
								inset: 0,
								background: 'rgba(0,0,0,0.6)',
								backdropFilter: 'blur(8px)',
								WebkitBackdropFilter: 'blur(8px)',
								zIndex: 40,
							}}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.25 }}
							onClick={() => setSelectedId(null)}
						/>

						{/* Card wrapper */}
						<div
							style={{
								position: 'fixed',
								inset: 0,
								zIndex: 50,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								padding: 24,
								pointerEvents: 'none',
							}}
						>
							<motion.div
								layoutId={`container-${selectedId}`}
								transition={SPRING}
								onClick={(e) => e.stopPropagation()}
								style={{
									borderRadius: 20,
									background: '#141414',
									boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08), 0 25px 60px rgba(0,0,0,0.5)',
									width: '100%',
									maxWidth: 420,
									overflow: 'hidden',
									pointerEvents: 'auto',
								}}
							>
								{/* Gradient header */}
								<motion.div
									layout="position"
									style={{
										height: 120,
										background: selectedItem.gradient,
										position: 'relative',
									}}
								>
									<div
										style={{
											position: 'absolute',
											inset: 0,
											background:
												'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.18), transparent 70%)',
										}}
									/>

									{/* Close */}
									<motion.button
										type="button"
										style={{
											position: 'absolute',
											top: 14,
											right: 14,
											width: 32,
											height: 32,
											borderRadius: 9999,
											background: 'rgba(0,0,0,0.3)',
											backdropFilter: 'blur(12px)',
											WebkitBackdropFilter: 'blur(12px)',
											color: 'rgba(255,255,255,0.85)',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											border: 'none',
											cursor: 'pointer',
											fontSize: 14,
										}}
										onClick={() => setSelectedId(null)}
										initial={{ opacity: 0, scale: 0.5 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.5 }}
										transition={{ delay: 0.12, duration: 0.2 }}
									>
										✕
									</motion.button>

									{/* Emoji badge */}
									<div
										style={{
											position: 'absolute',
											bottom: -24,
											left: 24,
										}}
									>
										<motion.div
											layoutId={`emoji-${selectedId}`}
											transition={SPRING}
											style={{
												width: 52,
												height: 52,
												borderRadius: 16,
												background: '#1a1a1a',
												boxShadow:
													'inset 0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.4)',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												fontSize: 24,
											}}
										>
											{selectedItem.emoji}
										</motion.div>
									</div>
								</motion.div>

								{/* Body */}
								<div style={{ padding: '36px 24px 24px' }}>
									<motion.span
										layoutId={`label-${selectedId}`}
										transition={SPRING}
										style={{
											fontSize: 20,
											fontWeight: 600,
											color: '#ffffff',
											display: 'block',
											marginBottom: 12,
										}}
									>
										{selectedItem.label}
									</motion.span>

									<motion.p
										initial={{ opacity: 0, filter: 'blur(4px)' }}
										animate={{ opacity: 1, filter: 'blur(0px)' }}
										exit={{ opacity: 0, filter: 'blur(4px)' }}
										transition={{ duration: 0.3, delay: 0.08 }}
										style={{
											fontSize: 14,
											lineHeight: 1.7,
											color: 'rgba(255,255,255,0.45)',
											margin: 0,
											marginBottom: 20,
										}}
									>
										{selectedItem.description}
									</motion.p>

									{/* Tags */}
									<motion.div
										initial={{ opacity: 0, y: 6 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 6 }}
										transition={{ duration: 0.25, delay: 0.12 }}
										style={{ display: 'flex', gap: 8 }}
									>
										{selectedItem.tags.map((tag) => (
											<span
												key={tag}
												style={{
													padding: '5px 12px',
													borderRadius: 9999,
													background: 'rgba(255,255,255,0.04)',
													boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
													color: 'rgba(255,255,255,0.35)',
													fontSize: 12,
													fontWeight: 500,
												}}
											>
												{tag}
											</span>
										))}
									</motion.div>

									{/* CTA */}
									<motion.button
										type="button"
										initial={{ opacity: 0, y: 8 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 8 }}
										transition={{ duration: 0.25, delay: 0.16 }}
										style={{
											marginTop: 24,
											width: '100%',
											padding: '13px 0',
											borderRadius: 14,
											border: 'none',
											background: selectedItem.gradient,
											color: '#fff',
											fontWeight: 600,
											fontSize: 14,
											cursor: 'pointer',
											boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
										}}
									>
										Explore →
									</motion.button>
								</div>
							</motion.div>
						</div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
}
