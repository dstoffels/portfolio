import Link from 'next/link';

const NavLink = ({ label }: { label: string }) => {
	return <Link href="/bot">{label}</Link>;
};

export default NavLink;
