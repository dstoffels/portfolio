import * as React from 'react';
import { useState, useEffect } from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	color?: ButtonColorOption;
};

const Button: React.FC<ButtonProps> = (props) => {
	const { className, color, ...remainingProps } = props;
	const colorClass = parseColor(color);

	return (
		<button
			className={`px-4 py-1.5 ${colorClass} rounded-sm transition-all duration-200 ${className}`}
			{...remainingProps}
		>
			{props.children}
		</button>
	);
};

export default Button;

export function parseColor(color: ButtonColorOption) {
	switch (color) {
		case 'transparent':
			return 'text-inherit hover:bg-white/5';
		case 'red':
			return 'text-white bg-red-800 hover:bg-red-900';
		case 'orange':
			return 'text-white bg-orange-700 hover:bg-orange-800';
		case 'amber':
			return 'text-black bg-amber-400 hover:bg-amber-500';
		case 'yellow':
			return 'text-black bg-yellow-300 hover:bg-yellow-400';
		case 'lime':
			return 'text-black bg-lime-400 hover:bg-lime-500';
		case 'green':
			return 'text-white bg-green-700 hover:bg-green-800';
		case 'emerald':
			return 'text-white bg-emerald-700 hover:bg-emerald-800';
		case 'teal':
			return 'text-white bg-teal-700 hover:bg-teal-800';
		case 'cyan':
			return 'text-black bg-cyan-300 hover:bg-cyan-400';
		case 'sky':
			return 'text-black bg-sky-300 hover:bg-sky-400';
		case 'indigo':
			return 'text-white bg-indigo-700 hover:bg-indigo-800';
		case 'violet':
			return 'text-white bg-violet-700 hover:bg-violet-800';
		case 'purple':
			return 'text-white bg-purple-700 hover:bg-purple-800';
		case 'fuchsia':
			return 'text-white bg-fuchsia-700 hover:bg-fuchsia-800';
		case 'pink':
			return 'text-white bg-pink-700 hover:bg-pink-800';
		case 'rose':
			return 'text-white bg-rose-700 hover:bg-rose-800';
		case 'slate':
			return 'text-white bg-slate-700 hover:bg-slate-800';
		case 'gray':
			return 'text-white bg-gray-700 hover:bg-gray-800';
		case 'neutral':
			return 'text-white bg-neutral-700 hover:bg-neutral-800';
		case 'stone':
			return 'text-white bg-stone-700 hover:bg-stone-800';
		case 'white':
			return 'text-black bg-white hover:bg-gray-100';
		case 'black':
			return 'text-white bg-black hover:bg-gray-900';
		case 'blue':
		default:
			return 'text-white bg-blue-800 hover:bg-blue-900';
	}
}

export type ButtonColorOption =
	| undefined
	| 'red'
	| 'orange'
	| 'amber'
	| 'yellow'
	| 'lime'
	| 'green'
	| 'emerald'
	| 'teal'
	| 'cyan'
	| 'sky'
	| 'blue'
	| 'indigo'
	| 'violet'
	| 'purple'
	| 'fuchsia'
	| 'pink'
	| 'rose'
	| 'slate'
	| 'gray'
	| 'neutral'
	| 'stone'
	| 'white'
	| 'black'
	| 'transparent';
