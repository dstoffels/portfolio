import NavLink from './NavLink';
import TextTicker from './TextTicker';

const Header = () => {
	return (
		<header className="px-20 h-16 dark:bg-zinc-900 fixed top-0 w-full flex gap-3 items-center">
			<div className="flex flex-1 items-baseline">
				<a href={'/'}>
					<TextTicker
						className="font-bold font-mono text-2xl mr-2 hover:text-indigo-300"
						text="Dan O Stoffels;"
					/>
				</a>
				<h2 className="text-lg font-thin">Full Stack Developer, React, Django</h2>
			</div>
			<NavLink label="Curriculum Vitae" href="/cv" />
			<NavLink label="Contact" href="/cv" />
		</header>
	);
};

export default Header;
