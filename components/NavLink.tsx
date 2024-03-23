import Link from 'next/link';

const NavLink = ({ label, href }: { label: string; href: string }) => {
	return (
		<Link
			href={href}
			className="px-2 py-1 text-indigo-400
			underline-offset-4 hover:tracking-wide duration-200 transition-all hover:border-b rounded-md hover:border-indigo-900 border-zinc-900"
		>
			{label.toUpperCase()}
		</Link>
	);
};

export default NavLink;
