import type React from 'react';
import type { FeatureItem } from '../../types/feature';
import { AppleFeatureAccordionItem } from './AppleFeatureAccordionItem';

interface AppleFeatureAccordionProps {
	features: FeatureItem[];
	activeId: string;
	onSelect: (id: string) => void;
}

export const AppleFeatureAccordion: React.FC<AppleFeatureAccordionProps> = ({
	features,
	activeId,
	onSelect,
}) => {
	return (
		<div className="max-w-xl w-full space-y-4">
			<h2 className="text-3xl md:text-4xl font-semibold mb-8 tracking-tight">
				Explore os detalhes.
			</h2>

			<div className="space-y-3" role="tablist" aria-orientation="vertical">
				{features.map((feature) => (
					<AppleFeatureAccordionItem
						key={feature.id}
						feature={feature}
						isActive={activeId === feature.id}
						onSelect={onSelect}
					/>
				))}
			</div>
		</div>
	);
};
