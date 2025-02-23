'use client';

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { FiCheck } from 'react-icons/fi';

export type EditFieldProps = React.PropsWithChildren & {
	label?: string;
	name?: string;
	canEdit?: boolean;
	value: string | number;
	onEdit: (newVal: string | number, key: string) => any;
};

const EditField = ({ label = '', name = '', canEdit, value, onEdit, children }: EditFieldProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [curVal, setCurVal] = useState(value);

	const handleClick = () => canEdit && setIsEditing(true);

	const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) =>
		setCurVal(e.target.value);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		e.stopPropagation();
		onEdit(curVal, name);
		setIsEditing(false);
	};

	const inputRef = useRef<HTMLTextAreaElement | null>(null);

	useEffect(() => {
		if (inputRef.current) {
			const textarea = inputRef.current;
			textarea.style.height = 'auto';
			textarea.style.height = `${textarea.scrollHeight}px`;
		}
	}, [curVal, isEditing]);

	return isEditing ? (
		<div>
			{label && <p className="font-semibold">{label}</p>}

			<textarea
				name={name}
				className="flex-grow resize-none overflow-hidden w-full bg-slate-900 border border-slate-500 rounded-sm p-1"
				rows={1}
				ref={inputRef}
				value={curVal}
				onChange={handleChange}
			/>
			<div className="flex justify-end">
				<button onClick={handleSubmit} className="text-2xl hover:bg-white/10 p-2 rounded-full">
					<FiCheck color="green" />
				</button>
			</div>
		</div>
	) : (
		<div>
			{label && canEdit && <p className="font-semibold">{label}</p>}
			<div
				onClick={handleClick}
				className={`min-h-6 ${
					canEdit ? 'border border-slate-800 hover:cursor-pointer hover:bg-white/5 p-1' : ''
				}`}
			>
				{children || value}
			</div>
		</div>
	);
};

export default EditField;
