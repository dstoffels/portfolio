'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';

export type InputFieldProps = (
	| React.InputHTMLAttributes<HTMLInputElement>
	| React.TextareaHTMLAttributes<HTMLTextAreaElement>
) & {
	label?: string;
	textarea?: boolean;
};

const InputField: React.FC<InputFieldProps> = (props) => {
	const { label, textarea, ...inputProps } = props;

	const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

	useEffect(() => {
		if (textareaRef?.current) {
			const textarea = textareaRef.current;
			textarea.style.height = 'auto';
			textarea.style.height = `${textarea.scrollHeight}px`;
		}
	}, [props.value]);

	return (
		<div className="w-full">
			<label className="w-full">{label}</label>
			{textarea ? (
				<textarea
					className="flex-grow resize-none overflow-hidden w-full bg-slate-800  rounded-sm p-1"
					rows={1}
					ref={textareaRef}
					{...(inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
				/>
			) : (
				<input
					className="w-full p-1 rounded-sm bg-slate-800"
					{...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
				/>
			)}
		</div>
	);
};

export default InputField;
