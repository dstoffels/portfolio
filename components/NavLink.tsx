import { PropsWithChildren } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { MdArrowRight, MdArrowRightAlt } from 'react-icons/md';

const NavLink = ({ children, href }: NavLinkProps) => {
	return (
		<a
			href={href}
			className="p-2 group flex w-full gap-1 hover:text-slate-200 hover:cursor-pointer hover:bg-stone-500/5 duration-300"
		>
			<span className="text-xl flex justify-end pb-0.5 text-center opacity-0 group-hover:flex-1 group-hover:opacity-100 transition-all duration-300">
				<MdArrowRightAlt className="" />
			</span>
			<span className="font-bold text-nowrap text-xs tracking-widest transition-all duration-300 ease-in-out flex-1 mr-4 group-hover:mr-0 group-hover:flex-none">
				{children?.toString().toUpperCase()}
			</span>
		</a>
	);
};

export default NavLink;

export type NavLinkProps = PropsWithChildren & {
	href: string;
};
