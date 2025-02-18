import P from '@/components/P';
import { Achievement } from '@/data/dbModel';

export type CVAchievementProps = {
	achievement: Achievement;
};

const CVAchievement: React.FC<CVAchievementProps> = ({ achievement }) => {
	return (
		<div className="mb-4">
			<h3 className="font-semibold text-orange-500">{achievement.title}</h3>
			<P>{achievement.description}</P>
		</div>
	);
};

export default CVAchievement;
