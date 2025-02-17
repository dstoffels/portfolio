'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import EditField from './EditField';
import Button from './Button';
import InputField from './InputField';

export type ListEditorProps = {
	label: string;
	list: string[];
	name?: string;
	onChange: (newList: string[], name: string) => void;
};

const ListEditor: React.FC<ListEditorProps> = ({ label, list, name = '', onChange }) => {
	const [newVal, setNewVal] = useState('');

	const handleAdd = () => {
		onChange([...list, newVal], name);
		setNewVal('');
	};

	const handleChange = (newVal: string, i: number) => {
		const newList = [...list];
		newList[i] = newVal;
		onChange([...newList], name);
	};

	const fields = list.map((v, i) => (
		<EditField
			key={`${name}-list-${i}`}
			canEdit
			value={v}
			onEdit={(newVal) => handleChange(newVal.toString(), i)}
		/>
	));

	return (
		<div className="space-y-2 p-2 border border-slate-600">
			<h4>{label}</h4>
			<div className="space-y-2">{fields}</div>
			<div className="flex space-x-2 items-center">
				<InputField
					value={newVal}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewVal(e.target.value)}
				/>
				<Button color="indigo" onClick={handleAdd} type="button">
					Add
				</Button>
			</div>
		</div>
	);
};

export default ListEditor;
