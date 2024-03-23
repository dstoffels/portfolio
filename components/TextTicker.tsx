'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';

const TextTicker = ({ text, interval = 1000, className }: TextTickerProps) => {
	const [displayedText, setDisplayedText] = useState('');

	useEffect(() => {
		setDisplayedText('');
		let i = 0;
		const intervalId = setInterval(() => {
			if (i < text.length) {
				const newText = text.slice(0, i + 1);
				setDisplayedText(newText);
				i++;
			} else {
				clearInterval(intervalId);
			}
		}, interval / text.length);

		return () => clearInterval(intervalId);
	}, []);

	return <p className={className}>{displayedText}</p>;
};

export default TextTicker;

export type TextTickerProps = {
	text: string;
	interval?: number;
	className?: string;
};
