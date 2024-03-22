import { PropsWithChildren } from 'react';

const P = ({ className, children }: PProps) => {
	return <p className={`text-xs ${className ?? className}`}>{children}</p>;
};

export default P;

export type PProps = PropsWithChildren & {
	className?: string;
};
