import Link from 'next/link';

const NavLink = ({ label, href }: { label: string; href: string }) => {
	return (
		<Link href={href} className="text-blue-200 hover:border-b">
			{label}
		</Link>
	);
};

export default NavLink;
