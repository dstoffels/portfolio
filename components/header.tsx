import NavLink from './NavLink';

const Header = () => {
	return (
		<header className="px-36 h-16 dark:bg-zinc-900 fixed top-0 w-full flex gap-3 items-center">
			<h1 className="font-bold text-lg flex-1">Dan O Stoffels</h1>
			<NavLink label="ChatBot" href="/bot" />
			<NavLink label="Curriculum Vitae" href="/cv" />
		</header>
	);
};

export default Header;
