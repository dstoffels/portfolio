import { PropsWithChildren, ReactElement } from 'react';

const SocialLink = ({ children, href, tooltip, className, newWindow = true }: ExtLinkProps) => {
	const target = newWindow ? '_blank' : '';

	return (
		<a
			className={`${className} hover:text-blue-400 duration-300 transition-all`}
			href={href}
			target={target}
		>
			{children}
		</a>
	);
};

export default SocialLink;

export type ExtLinkProps = PropsWithChildren & {
	href: string;
	tooltip?: string;
	className?: string;
	newWindow?: boolean;
};
