'use client';

import { PropsWithChildren } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { MdArrowRight, MdArrowRightAlt } from 'react-icons/md';

import * as React from 'react';
import { useState, useEffect } from 'react';

const NavLink = ({ children, href }: NavLinkProps) => {
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => setIsActive(entry.isIntersecting));
		const targetId = href.startsWith('#') ? href.substring(1) : href;
		const target = document.getElementById(targetId);

		if (target) observer.observe(target);
		return () => {
			target && observer.unobserve(target);
		};
	}, [href]);

	return (
		<a
			href={href}
			className={`py-2 group flex w-full gap-1 ${
				isActive ? 'text-slate-200' : ''
			} hover:text-slate-200 hover:cursor-pointer hover:from-stone-500/10 hover:bg-gradient-to-r duration-300`}
		>
			<span
				className={`text-xl flex justify-end text-center opacity-0 group-hover:flex-1 ${
					isActive ? 'flex-1 opacity-100' : ''
				} group-hover:opacity-100 transition-all duration-300`}
			>
				<MdArrowRightAlt className="pb-1" />
			</span>
			<span
				className={`font-bold text-nowrap text-xs tracking-widest transition-all duration-300 ease-in-out flex-1 group-hover:-mr-4 group-hover:flex-none ${
					isActive ? '-mr-4 flex-none' : ''
				}`}
			>
				{children?.toString().toUpperCase()}
			</span>
		</a>
	);
};

export default NavLink;

export type NavLinkProps = PropsWithChildren & {
	href: string;
};
