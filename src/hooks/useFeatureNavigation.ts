import { useCallback, useState } from 'react';
import type { FeatureItem } from '../types/feature';

export const useFeatureNavigation = (features: FeatureItem[]) => {
	const [activeId, setActiveId] = useState<string>(features[0].id);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			const currentIndex = features.findIndex((f) => f.id === activeId);

			if (e.key === 'ArrowDown') {
				e.preventDefault();
				const nextIndex = (currentIndex + 1) % features.length;
				setActiveId(features[nextIndex].id);
			} else if (e.key === 'ArrowUp') {
				e.preventDefault();
				const prevIndex = (currentIndex - 1 + features.length) % features.length;
				setActiveId(features[prevIndex].id);
			}
		},
		[activeId, features]
	);

	return {
		activeId,
		setActiveId,
		handleKeyDown,
	};
};
