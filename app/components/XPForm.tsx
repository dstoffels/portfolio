'use client';

import BtnForm from '@/components/BtnForm';
import InputField from '@/components/InputField';
import ProfessionalInfoModel, { Experience } from '@/data/dbModel';
import { updateDoc } from '@/utils/db';
import * as React from 'react';
import { useState, useEffect } from 'react';

export type XPFormProps = {
	xp?: Experience;
	index?: number;
	db: ProfessionalInfoModel;
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

const XPForm: React.FC<XPFormProps> = ({ xp = defaultXP, index, db }) => {
	const [xpObj, setXpObj] = useState(xp);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setXpObj({ ...xpObj, [e.target.name]: e.target.value });

	const handleSubmit = async () => {
		if (index) db.experience[index] = xpObj;
		else {
			db.experience.push(xpObj);
			setXpObj(xp);
		}

		db.experience.sort((x, y) => x.endDate.localeCompare(y.endDate));
		await updateDoc('professionalInfo', db);
	};

	const handleCancel = () => {
		setXpObj(xp);
	};

	return (
		<BtnForm
			className="flex-col space-y-3 bg-slate-900 p-4"
			onSubmit={handleSubmit}
			onClose={handleCancel}
			btnText="Add XP"
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
				label="Location"
				type="text"
				name="location"
				value={xpObj.location}
				onChange={handleChange}
			/>
			<InputField
				label="Description"
				type="text"
				name="description"
				value={xpObj.description}
				onChange={handleChange}
			/>
		</BtnForm>
	);
};

export default XPForm;
