import NavLink from '@/components/NavLink';
import TextTicker from '../components/TextTicker';
import { fetchCVData } from './actions';
import SocialLink from '@/components/SocialLink';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiReaddotcv } from 'react-icons/si';
import Chatbot from './ChatBot';

const Header = async () => {
	const data = await fetchCVData();

	return (
		<div className="lg:w-2/5 max-h-screen">
			<header className="p-4 lg:py-16 lg:pl-16 h-screen lg:fixed top-0 lg:w-2/5 items-center flex flex-col">
				<div className="mb-10 w-full">
					<a href={'/'}>
						<TextTicker
							className="font-semibold text-amber-700 tracking-tight mb-2 font-mono text-4xl mr-2 hover:text-amber-600 hover:tracking-normal transition-all duration-200"
							text={`${data.name};`}
						/>
					</a>
					<div className="flex">
						<div>
							<h2 className="text-xl text-gray-100 font-light mb-4">{data.subtitle}</h2>
							<p className="text-base tracking-wide">{data.tagline}</p>
						</div>
						<nav className="text-right w-full max-lg:hidden">
							<NavLink href="#">Dan</NavLink>
							<NavLink href="#xp">xp</NavLink>
							<NavLink href="#projects">My Work</NavLink>
						</nav>
					</div>
				</div>

				<Chatbot />
				<footer className="text-3xl flex gap-8 items-end">
					<SocialLink href={data.socials.github} tooltip="GitHub">
						<FaGithub />
					</SocialLink>
					<SocialLink href={data.socials.linkedin} tooltip="LinkedIn">
						<FaLinkedin />
					</SocialLink>
					<SocialLink href="/cv/dan-stoffels-cv.pdf" newWindow={false} tooltip="CV">
						<SiReaddotcv />
					</SocialLink>
				</footer>
			</header>
		</div>
	);
};

export default Header;
