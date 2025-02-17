'use client';

import { Link } from '@/data/dbModel';
import * as React from 'react';
import { useState } from 'react';
import InputField from './InputField';
import Button from './Button';

export type LinkFormProps = {
	btnText?: string;
	link?: Link;
	index?: number;
	onSubmit: (link: Link, index?: number) => void;
};

export const defaultLink: Link = {
	title: '',
	href: '',
};

const LinkForm: React.FC<LinkFormProps> = ({
	onSubmit,
	link = defaultLink,
	index,
	btnText = 'New Link',
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [linkObj, setLinkObj] = useState(link);

	const handleEditing = () => {
		setIsEditing(true);
	};

	const handleClose = () => {
		setLinkObj(link);
		setIsEditing(false);
	};

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setLinkObj({ ...linkObj, [e.target.name]: e.target.value });
	};

	const handleSubmit = () => {
		onSubmit(linkObj, index);
		handleClose();
	};

	return isEditing ? (
		<div className="p-2 border border-slate-800 space-y-3">
			<InputField label="Title" name="title" value={linkObj.title} onChange={handleChange} />
			<InputField textarea label="Link" name="href" value={linkObj.href} onChange={handleChange} />
			<div className="flex justify-end space-x-3">
				<Button onClick={handleSubmit}>Submit</Button>
				<Button color="red" onClick={handleClose}>
					Cancel
				</Button>
			</div>
		</div>
	) : (
		<div
			className={`flex justify-between items-center space-x-3 p-1 ${
				index != undefined ? 'border border-slate-800 rounded-sm' : ''
			}`}
		>
			<div className="overflow-hidden">
				{link.title && <p className="font-semibold">{link.title}</p>}
				{link.href && <p className="truncate">{link.href}</p>}
			</div>
			<Button className="" color="indigo" onClick={handleEditing}>
				{btnText}
			</Button>
		</div>
	);
};

export default LinkForm;
