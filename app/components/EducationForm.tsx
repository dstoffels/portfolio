'use client';

import BtnForm from '@/components/BtnForm';
import InputField from '@/components/InputField';
import ProfessionalInfoModel, { Education } from '@/data/dbModel';
import { updatePDF } from '@/utils/firebaseActions';
import * as React from 'react';
import { useState, useEffect } from 'react';

export type EducationFormProps = {
	btnLabel?: string;
	education?: Education;
	index?: number;
	isAdmin: boolean;
	info: ProfessionalInfoModel;
};

const defaultEducation: Education = {
	startDate: '',
	endDate: '',
	degree: '',
	institution: '',
	location: '',
};

const EducationForm: React.FC<EducationFormProps> = ({
	btnLabel,
	education = defaultEducation,
	index,
	isAdmin,
	info,
}) => {
	const [educationObj, setEducationObj] = useState(education);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEducationObj({ ...educationObj, [e.target.name]: e.target.value });
	};

	const handleSubmit = async () => {
		if (index === undefined) {
			info.education.push(educationObj);
			setEducationObj(education); // reset form
		} else {
			info.education[index] = educationObj;
		}

		info.education.sort((a, b) => b.endDate.localeCompare(a.endDate));
		await updatePDF('professionalInfo', info);
	};

	const handleDelete = async () => {
		if (index !== undefined) {
			info.education.splice(index, 1);
			await updatePDF('professionalInfo', info);
		}
	};

	return (
		isAdmin && (
			<div className="p-2 border border-slate-800 mb-3">
				<div className="flex justify-between">
					<div>
						<h3 className="font-semibold">{educationObj.degree}</h3>
						<p>{education.institution}</p>
						<p>{education.location}</p>
					</div>
					<div>
						<div>{education.startDate}</div>
						<div>{education.endDate}</div>
					</div>
				</div>

				<div className="flex justify-end">
					<BtnForm
						btnText={btnLabel || 'Create New Education'}
						onSubmit={handleSubmit}
						canDelete={index !== undefined}
						onDelete={handleDelete}
					>
						<div className="flex space-between space-x-4">
							<InputField
								label="Start Date"
								name="startDate"
								type="date"
								value={educationObj.startDate}
								onChange={handleChange}
							/>
							<InputField
								label="End Date"
								name="endDate"
								type="date"
								value={educationObj.endDate}
								onChange={handleChange}
							/>
						</div>
						<InputField
							label="Degree"
							name="degree"
							value={educationObj.degree}
							onChange={handleChange}
						/>
						<InputField
							label="Institution"
							name="institution"
							value={educationObj.institution}
							onChange={handleChange}
						/>
						<InputField
							label="Location"
							name="location"
							value={educationObj.location}
							onChange={handleChange}
						/>
					</BtnForm>
				</div>
			</div>
		)
	);
};

export default EducationForm;
