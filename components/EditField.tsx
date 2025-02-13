'use client';

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { RenderablePrimitive } from '@/app/types';
import { FiCheck } from 'react-icons/fi';

export type EditFieldProps = React.PropsWithChildren & {
	canEdit?: boolean;
	value: string | number;
	onEdit: (newVal: string | number) => any;
	type?: React.HTMLInputTypeAttribute;
};

const EditField = ({ canEdit, value, onEdit, type = 'text', children }: EditFieldProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [curVal, setCurVal] = useState(value);

	const handleClick = () => canEdit && setIsEditing(true);
	const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) =>
		setCurVal(e.target.value);
	const handleSubmit = () => {
		onEdit(curVal);
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
		<form onSubmit={handleSubmit}>
			<textarea
				className="flex-grow resize-none overflow-hidden w-full bg-slate-900 border border-slate-500 rounded-sm p-1"
				rows={1}
				ref={inputRef}
				value={curVal}
				onChange={handleChange}
			/>
			<div className="flex justify-end">
				<button className="text-2xl hover:bg-white/10 p-2 rounded-full">
					<FiCheck color="green" />
				</button>
			</div>
		</form>
	) : (
		<div
			onClick={handleClick}
			className={`min-h-6 ${
				canEdit ? 'border border-slate-800 hover:cursor-pointer hover:bg-white/5 p-1' : ''
			}`}
		>
			{children}
		</div>
	);
};

export default EditField;
