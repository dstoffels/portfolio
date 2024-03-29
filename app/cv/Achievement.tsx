import P from '@/components/P';
import { AchievementType } from '../types';

const Achievement = ({ achievement }: AchievementsProps) => {
	return (
		<div className="mb-4">
			<h3 className="font-semibold text-orange-500">{achievement.title}</h3>
			<P>{achievement.description}</P>
		</div>
	);
};

export default Achievement;

export type AchievementsProps = {
	achievement: AchievementType;
};
