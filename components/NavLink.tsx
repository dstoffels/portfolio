import { PropsWithChildren } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { MdArrowRight, MdArrowRightAlt } from 'react-icons/md';

const NavLink = ({ children, href }: NavLinkProps) => {
	return (
		<div className="p-2 group hover:text-slate-200 hover:cursor-pointer hover:bg-stone-500/5 duration-300 transition-all align-middle">
			<a
				href={href}
				className="font-bold text-xs tracking-widest transition-all mr-4 group-hover:mr-0 duration-300"
			>
				<MdArrowRightAlt className="text-xl mr-96 pb-0.5 text-center opacity-0 group-hover:mr-1 group-hover:opacity-100 inline transition-all duration-300" />
				{children?.toString().toUpperCase()}
			</a>
		</div>
	);
};

export default NavLink;

export type NavLinkProps = PropsWithChildren & {
	href: string;
};
