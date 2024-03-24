import { PropsWithChildren, ReactElement } from 'react';

const SocialLink = ({ children, href, tooltip, className, newWindow = true }: ExtLinkProps) => {
	const target = newWindow ? '_blank' : '';

	return (
		<a
			className={`${className} hover:text-blue-400 group relative hover:pb-4 flex flex-col justify-center gap-2 p-2 text-center duration-300 transition-all`}
			href={href}
			target={target}
		>
			{children}
			<div className="text-sm font-light inset-y-12 inset-x-0 opacity-0 absolute group-hover:opacity-100 duration-300 ease-in-out">
				{tooltip}
			</div>
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
