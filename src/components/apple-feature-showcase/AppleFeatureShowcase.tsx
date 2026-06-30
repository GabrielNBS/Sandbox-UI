import type React from 'react';
import { useFeatureNavigation } from '../../hooks/useFeatureNavigation';
import type { FeatureItem } from '../../types/feature';
import { AppleFeatureAccordion } from './AppleFeatureAccordion';
import { AppleFeatureBackground } from './AppleFeatureBackground';
import { AppleFeatureDotNav } from './AppleFeatureDotNav';

interface AppleFeatureShowcaseProps {
	features: FeatureItem[];
}

export const AppleFeatureShowcase: React.FC<AppleFeatureShowcaseProps> = ({ features }) => {
	const { activeId, setActiveId, handleKeyDown } = useFeatureNavigation(features);
	const activeFeature = features.find((f) => f.id === activeId) || features[0];

	return (
		<div
			className="relative w-full min-h-[700px] bg-[#000] text-white rounded-[2.5rem] overflow-hidden focus:outline-none"
			onKeyDown={handleKeyDown}
			role="region"
			aria-label="Galeria de funcionalidades Apple"
		>
			<AppleFeatureBackground activeId={activeId} imageSrc={activeFeature.image} />

			<div className="relative z-10 h-full max-w-6xl mx-auto p-8 md:p-16 flex items-center min-h-[700px] gap-4 md:gap-12">
				<AppleFeatureDotNav features={features} activeId={activeId} onSelect={setActiveId} />

				<AppleFeatureAccordion features={features} activeId={activeId} onSelect={setActiveId} />
			</div>
		</div>
	);
};
