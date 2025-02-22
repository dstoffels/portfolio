'use client';

import EditField from '@/components/EditField';
import ProfessionalInfoModel, { Link } from '@/data/dbModel';
import { updateDoc } from '@/utils/firebaseActions';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { editInfoField } from '../actions';
import LinkForm from '@/app/components/LinkForm';
import ListEditor from '@/components/ListEditor';
import Button from '@/components/Button';

export type InfoFormProps = {
	info: ProfessionalInfoModel;
	isAdmin: boolean;
};

const InfoForm: React.FC<InfoFormProps> = ({ info, isAdmin }) => {
	const handleEdit = async (newVal: any, key: keyof ProfessionalInfoModel) => {
		await editInfoField(info, key, newVal);
	};

	const handleLink = async (link: Link, index?: number) => {
		if (index != undefined && index >= 0) info.links[index] = link;
		else info.links.push(link);

		await updateDoc('professionalInfo', info);
	};

	const links = info.links.map((l, i) => (
		<LinkForm key={`link-${i}`} link={l} onSubmit={handleLink} btnText="Edit Link" index={i} />
	));

	return (
		isAdmin && (
			<div className="space-y-3 mb-3">
				<h3 className="text-xl font-semibold">Resume Info</h3>
				<EditField label="Name" name="name" value={info.name} canEdit onEdit={handleEdit} />
				<EditField label="Title" name="title" value={info.title} canEdit onEdit={handleEdit} />
				<EditField
					label="Tagline"
					name="tagline"
					value={info.tagline}
					canEdit
					onEdit={handleEdit}
				/>
				<EditField
					label="Subtitle"
					name="subtitle"
					value={info.subtitle}
					canEdit
					onEdit={handleEdit}
				/>
				<EditField label="Email" name="email" value={info.email} canEdit onEdit={handleEdit} />
				<EditField label="Phone" name="phone" value={info.phone} canEdit onEdit={handleEdit} />
				<EditField
					label="Location"
					name="location"
					value={info.location}
					canEdit
					onEdit={handleEdit}
				/>
				<EditField
					label="Summary"
					name="summary"
					value={info.summary}
					canEdit
					onEdit={handleEdit}
				/>
				<div className="p-2 border border-slate-700 space-y-2">
					<h3 className="text-lg font-semibold">Links</h3>
					{links}
					<LinkForm onSubmit={handleLink} />
				</div>
			</div>
		)
	);
};

export default InfoForm;
