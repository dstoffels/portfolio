import NavLink from '@/components/NavLink';
import TextTicker from '../components/TextTicker';
import { fetchCVData } from './cv/actions';
import SocialLink from '@/components/SocialLink';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Header = () => {
	const data = fetchCVData();

	return (
		<div className="w-2/5">
			<header className="py-16 pl-16 h-screen fixed top-0 w-2/5 items-center">
				<div className="mb-8">
					<a href={'/'}>
						<TextTicker
							className="font-semibold text-amber-700 tracking-tight mb-2 font-mono text-5xl mr-2 hover:text-amber-600 hover:tracking-normal transition-all duration-200"
							text={`${data.name};`}
						/>
					</a>
					<h2 className="text-xl text-gray-100 font-light mb-4">{data.subtitle}</h2>
					<p className="text-base tracking-wide">{data.tagline}</p>
				</div>
				<nav className="text-right">
					<NavLink href="#about">Dan</NavLink>
					<NavLink href="#xp">xp</NavLink>
					<NavLink href="#projects">My Work</NavLink>
				</nav>
				<footer className="text-3xl flex gap-8 items-center">
					<SocialLink href={data.socials.github}>
						<FaGithub />
					</SocialLink>
					<SocialLink href={data.socials.linkedin}>
						<FaLinkedin />
					</SocialLink>
				</footer>
			</header>
		</div>
	);
};

export default Header;
