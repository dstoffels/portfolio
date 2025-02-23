'use client';

import BtnForm from '@/components/BtnForm';
import InputField from '@/components/InputField';
import ProfessionalInfoModel, { Skill, Skillset } from '@/data/dbModel';
import { updatePDF } from '@/utils/firebaseActions';
import * as React from 'react';
import { useState, useEffect } from 'react';
import SkillForm from './SkillForm';
import { H3 } from '@/components/H';

export type SkillsetFormProps = {
	btnLabel?: string;
	skillset?: Skillset;
	index?: number;
	isAdmin: boolean;
	info: ProfessionalInfoModel;
	onEdit?: (isEditing: boolean) => void;
};

const defaultSkillset: Skillset = {
	name: '',
	skills: [],
};

const SkillsetForm: React.FC<SkillsetFormProps> = ({
	btnLabel,
	skillset = defaultSkillset,
	index,
	isAdmin,
	info,
	onEdit,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [skillsetObj, setSkillsetObj] = useState(skillset);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setSkillsetObj({ ...skillsetObj, [e.target.name]: e.target.value });

	const handleSubmit = async () => {
		if (index === undefined) {
			info.skills.push(skillsetObj);
			setSkillsetObj(skillset); // reset form
		} else {
			info.skills[index] = skillsetObj;
		}

		info.skills.forEach(({ skills }) => skills.sort((a, b) => b.proficiency - a.proficiency));

		await updatePDF('professionalInfo', info);
	};

	const handleSkillChange = (skill: Skill, index?: number) => {
		if (index === undefined) {
			setSkillsetObj({ ...skillsetObj, skills: [...skillsetObj.skills, skill] });
		} else {
			const skills = [...skillsetObj.skills];
			skills[index] = skill;

			setSkillsetObj({ ...skillsetObj, skills });
		}
	};

	const handleDelete = async () => {
		if (index !== undefined) {
			info.skills.splice(index, 1);
			await updatePDF('professionalInfo', info);
		}
	};

	const handleSkillDelete = async (i: number | undefined) => {
		if (i !== undefined) {
			const skills = [...skillsetObj.skills];
			skills.splice(i, 1);
			setSkillsetObj({ ...skillsetObj, skills });
		}
	};

	const skills = skillsetObj.skills.map((skill, i) => (
		<div key={`skill-base-${i}`}>
			<p>{skill.name}</p>
			<p>{skill.proficiency}/5</p>
		</div>
	));

	const skillForms = skillsetObj.skills.map((skill, i) => (
		<SkillForm
			key={`skill-${skill.name}-${i}`}
			skill={skill}
			index={i}
			onSubmit={handleSkillChange}
			btnLabel="Edit"
			onDelete={handleSkillDelete}
		/>
	));

	return (
		isAdmin && (
			<div className="p-2 border border-slate-800">
				<h3 className="text-lg font-semibold">{skillset.name}</h3>
				<div className="p-2 ">
					<div className="space-y-3">
						{isEditing ? skillForms : skills}

						{isEditing && <SkillForm onSubmit={handleSkillChange} />}
					</div>
				</div>
				<div className="flex justify-end">
					<BtnForm
						className="flex flex-col space-y-3 p-4"
						btnText={btnLabel || 'Create Skillset'}
						onSubmit={handleSubmit}
						onOpen={() => setIsEditing(true)}
						onClose={() => setIsEditing(false)}
						canDelete={index !== undefined}
						onDelete={handleDelete}
					>
						<InputField
							label="Skillset"
							type="text"
							name="name"
							value={skillsetObj.name}
							onChange={handleChange}
						/>
					</BtnForm>
				</div>
			</div>
		)
	);
};

export default SkillsetForm;
