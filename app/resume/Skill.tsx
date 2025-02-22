import P from '@/components/P';
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from 'react-icons/io';
import { SkillType } from '../types';

const Skill = ({ skill }: SkillProps) => {
	const stars = generateStarIcons(skill.proficiency);

	return (
		<div className="flex justify-between text-xs">
			<P>{skill.name}</P>
			<div className="flex items-center">{stars}</div>
		</div>
	);
};

export default Skill;

export type SkillProps = {
	skill: SkillType;
};

function generateStarIcons(proficiency: number) {
	const floor = Math.floor(proficiency);
	const stars = [];
	for (let i = 0; i < floor; i++) stars.push(<IoMdStar key={`star-${i}`} />);

	if (proficiency - floor > 0) stars.push(<IoMdStarHalf key="half-star" />);

	const remainder = 5 - stars.length;

	for (let i = 0; i < remainder; i++) stars.push(<IoMdStarOutline key={`estar-${i}`} />);

	return stars;
}
