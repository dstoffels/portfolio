import * as React from 'react';
import { useState, useEffect } from 'react';

export type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label: string;
};

const InputField: React.FC<InputFieldProps> = (props) => {
	const { label, ...inputProps } = props;

	return (
		<div className="w-full">
			<label className="w-full">{label}</label>
			<input className="w-full p-1 rounded-sm bg-slate-700" {...inputProps} />
		</div>
	);
};

export default InputField;
