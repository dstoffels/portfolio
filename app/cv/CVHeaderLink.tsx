import { PropsWithChildren, ReactElement } from 'react';
import { IconType } from 'react-icons';

const CVHeaderLink = ({ children, href, Icon }: CVHeaderLinkProps) => {
	const linkClass = href ? ' text-sky-900 hover:text-sky-500 underline' : '';

	return (
		children && (
			<a href={href} className="mr-4 last:mr-0">
				<Icon className="text-sky-700 mr-1 inline align-middle" />
				<span className={`text-xs align-middle${linkClass}`}>{children}</span>
			</a>
		)
	);
};

export default CVHeaderLink;

export type CVHeaderLinkProps = PropsWithChildren & {
	href?: string;
	Icon: IconType;
};
