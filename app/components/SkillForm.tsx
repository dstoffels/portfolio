'use client';

import BtnForm from '@/components/BtnForm';
import InputField from '@/components/InputField';
import { Skill } from '@/data/dbModel';
import * as React from 'react';
import { useState, useEffect } from 'react';

export type SkillFormProps = {
	btnLabel?: string;
	skill?: Skill;
	index?: number;
	onSubmit: (skill: Skill, index?: number) => void;
	onDelete?: (index?: number) => void;
};

const defaultSkill: Skill = {
	name: '',
	proficiency: 5,
};

const SkillForm: React.FC<SkillFormProps> = ({
	btnLabel = 'Add Skill',
	skill = defaultSkill,
	index,
	onSubmit,
	onDelete,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [skillObj, setSkillObj] = useState(skill);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setSkillObj({ ...skillObj, [e.target.name]: e.target.value });

	const handleSubmit = () => {
		onSubmit(skillObj, index);
		setSkillObj(skill); // reset
	};

	const handleDelete = () => {
		onDelete && onDelete(index);
	};

	return (
		<div className="border border-slate-800 p-1 flex justify-between items-center rounded-sm">
			{index !== undefined && !isEditing && (
				<div>
					<p className="font-semibold">{skill.name}</p>
					<p>{skill.proficiency}/5</p>
				</div>
			)}

			<BtnForm
				className="flex-col space-y-3 bg-slate-900 p-4 w-full"
				btnText={btnLabel}
				submitBtnText="Ship It"
				onSubmit={handleSubmit}
				onOpen={() => setIsEditing(true)}
				onClose={() => setIsEditing(false)}
				canDelete={index !== undefined}
				onDelete={handleDelete}
			>
				<InputField
					label="Skill"
					type="text"
					name="name"
					value={skillObj.name}
					onChange={handleChange}
				/>
				<InputField
					label="Proficiency"
					type="number"
					name="proficiency"
					value={skillObj.proficiency}
					onChange={handleChange}
				/>
			</BtnForm>
		</div>
	);
};

export default SkillForm;
