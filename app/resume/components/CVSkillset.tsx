import { Skillset } from '@/data/dbModel';
import * as React from 'react';
import CVSkill from './CVSkill';

export type CVSkillsetProps = {
	skillset: Skillset;
};

const CVSkillset: React.FC<CVSkillsetProps> = ({ skillset }) => {
	const skills = skillset.skills.map((s, i) => <CVSkill key={`cvskill-${i}`} skill={s} />);

	return (
		<div className="mb-3">
			<h3 className="font-semibold mb-1 text-orange-500">{skillset.name}</h3>
			<div>{skills}</div>
		</div>
	);
};

export default CVSkillset;
