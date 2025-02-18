'use client';

import BtnForm from '@/components/BtnForm';
import InputField from '@/components/InputField';
import ListEditor from '@/components/ListEditor';
import ProfessionalInfoModel, { Experience } from '@/data/dbModel';
import { updateDoc } from '@/utils/db';
import * as React from 'react';
import { useState, useEffect } from 'react';

export type XPFormProps = {
	btnLabel?: string;
	xp?: Experience;
	index?: number;
	info: ProfessionalInfoModel;
	onEdit?: (isEditing: boolean) => void;
	onSubmit?: () => void;
};

const defaultXP: Experience = {
	startDate: '',
	endDate: '',
	position: '',
	company: '',
	location: '',
	description: '',
	responsibilities: [],
	tags: [],
};

const XPForm: React.FC<XPFormProps> = ({ btnLabel, xp = defaultXP, index, info, onEdit }) => {
	const [xpObj, setXpObj] = useState(xp);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setXpObj({ ...xpObj, [e.target.name]: e.target.value });

	const handleListChange = (newList: string[], key: string) => {
		setXpObj({ ...xpObj, [key]: newList });
	};

	const handleSubmit = async () => {
		if (index === undefined) {
			info.experience.push(xpObj);
			setXpObj(xp); // reset form
		} else {
			info.experience[index] = xpObj;
		}

		info.experience.sort((x, y) => x.endDate.localeCompare(y.endDate));
		await updateDoc('professionalInfo', info);
	};

	const handleCancel = () => {
		onEdit && onEdit(false);
		setXpObj(xp);
	};

	const { responsibilities, tags } = xpObj;

	return (
		<div>
			<BtnForm
				className="flex-col space-y-3 bg-slate-900 p-4"
				onSubmit={handleSubmit}
				onClose={handleCancel}
				onOpen={() => onEdit && onEdit(true)}
				btnText={btnLabel || 'Create New XP'}
			>
				<div className="flex space-x-3">
					<InputField
						label="Start Date"
						type="date"
						name="startDate"
						value={xpObj.startDate}
						onChange={handleChange}
					/>
					<InputField
						label="End Date"
						type="date"
						name="endDate"
						value={xpObj.endDate}
						onChange={handleChange}
					/>
				</div>
				<InputField
					label="Position"
					type="text"
					name="position"
					value={xpObj.position}
					onChange={handleChange}
				/>
				<InputField
					label="Company"
					type="text"
					name="company"
					value={xpObj.company}
					onChange={handleChange}
				/>
				<InputField
					label="Location"
					type="text"
					name="location"
					value={xpObj.location}
					onChange={handleChange}
				/>
				<InputField
					label="Description"
					type="text"
					textarea
					name="description"
					value={xpObj.description}
					onChange={handleChange}
				/>
				<ListEditor
					name="responsibilities"
					label="Responsibilities"
					list={responsibilities}
					onChange={handleListChange}
				/>
				<ListEditor name="tags" label="Tags" list={tags} onChange={handleListChange} />
			</BtnForm>
		</div>
	);
};

export default XPForm;
