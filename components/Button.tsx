import * as React from 'react';
import { useState, useEffect } from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = (props) => {
	return (
		<button
			className="px-4 py-1.5 text-white bg-blue-700 hover:bg-blue-800 rounded-sm transition-all duration-200"
			{...props}
		>
			{props.children}
		</button>
	);
};

export default Button;
