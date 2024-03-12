import NavLink from './NavLink';

const Header = () => {
	return (
		<header className="px-2 py-2 dark:bg-zinc-900 w-1/6">
			<h1 className="font-bold text-lg">Dan O Stoffels</h1>
			<NavLink label="ChatBot" />
		</header>
	);
};

export default Header;
