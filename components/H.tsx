'use client';

import * as React from 'react';

export type HProps = React.PropsWithChildren & {
	className?: string;
};

const H1: React.FC<HProps> = ({ children, className }) => {
	return <h1 className={`text-3xl font-semibold ${className}`}>{children}</h1>;
};
const H2: React.FC<HProps> = ({ children, className }) => {
	return <h2 className={`text-2xl font-semibold ${className}`}>{children}</h2>;
};
const H3: React.FC<HProps> = ({ children, className }) => {
	return <h3 className={`text-xl font-semibold ${className}`}>{children}</h3>;
};
const H4: React.FC<HProps> = ({ children, className }) => {
	return <h4 className={`text-lg font-semibold ${className}`}>{children}</h4>;
};
const H5: React.FC<HProps> = ({ children, className }) => {
	return <h5 className={`font-semibold ${className}`}>{children}</h5>;
};
const H6: React.FC<HProps> = ({ children, className }) => {
	return <h6 className={`text-sm font-semibold ${className}`}>{children}</h6>;
};

export { H1, H2, H3, H4, H5, H6 };
