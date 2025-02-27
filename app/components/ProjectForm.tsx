'use client';

import BtnForm from '@/components/BtnForm';
import InputField from '@/components/InputField';
import ProfessionalInfoModel, { Link, Project } from '@/data/dbModel';
import * as React from 'react';
import { useState, useEffect } from 'react';
import LinkForm from './LinkForm';
import ListEditor from '@/components/ListEditor';
import { api } from '@/utils/nexios';
import { updatePDF } from '@/utils/firebaseActions';

export type ProjectFormProps = {
	btnText?: string;
	project?: Project;
	index?: number;
	isAdmin: boolean;
	info: ProfessionalInfoModel;
	onEdit?: (isEditing: boolean) => void;
	/** CURRENTLY UNIMPLEMENTED */
	onSubmit?: () => void;
};

export const defaultProject: Project = {
	title: '',
	description: '',
	links: [],
	tags: [],
};

const ProjectForm: React.FC<ProjectFormProps> = ({
	btnText,
	project = defaultProject,
	index,
	isAdmin,
	info,
	onEdit,
}) => {
	const [projectObj, setProjectObj] = useState(project);

	const handleSubmit = async () => {
		if (index === undefined) {
			index = info.projects.push(projectObj) - 1;
		} else {
			info.projects[index] = projectObj;
		}

		const response = await api.get<{ base64Img: string }>('/screenshot', {
			params: { url: projectObj.links[0].href },
		});

		info.projects[index].base64Img = response.data?.base64Img;

		await updatePDF('professionalInfo', info);
		setProjectObj(project); // reset form
	};

	const handleCancel = () => {
		onEdit && onEdit(false);
		setProjectObj(project);
	};

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setProjectObj({ ...projectObj, [e.target.name]: e.target.value });
	};

	const handleLink = (link: Link, index?: number) => {
		let links = [...projectObj.links];
		if (index === undefined) links.push(link);
		else links[index] = link;
		setProjectObj({ ...projectObj, links });
	};

	const handleListChange = (newList: string[], key: string) => {
		setProjectObj({ ...projectObj, [key]: newList });
	};

	const links = projectObj.links.map((l, i) => (
		<LinkForm key={`link-${i}`} link={l} onSubmit={handleLink} btnText="Edit Link" index={i} />
	));

	const { tags } = projectObj;

	return (
		isAdmin && (
			<BtnForm
				btnText={btnText || 'Create New Project'}
				onSubmit={handleSubmit}
				onClose={handleCancel}
			>
				<InputField name="title" label="Title" value={projectObj.title} onChange={handleChange} />
				<InputField
					textarea
					name="description"
					label="Description"
					value={projectObj.description}
					onChange={handleChange}
				/>
				<div className="p-2 border border-slate-700 space-y-2">
					<h3 className="text-lg font-semibold">Links</h3>
					{links}
					<LinkForm onSubmit={handleLink} />
				</div>

				<ListEditor name="tags" label="Tags" list={tags} onChange={handleListChange} />
			</BtnForm>
		)
	);
};

export default ProjectForm;
