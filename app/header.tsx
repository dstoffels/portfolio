import NavLink from '@/components/NavLink';
import TextTicker from '../components/TextTicker';
import { fetchCVData } from './actions';
import SocialLink from '@/components/SocialLink';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiReaddotcv } from 'react-icons/si';
import Chatbot from './components/ChatBot';

import { fetchDoc } from '@/utils/firebaseActions';
import { getIcon } from './resume/components/CVHeader';

const Header = async () => {
	const info = await fetchDoc('professionalInfo');

	const links = info.links
		.filter(({ title }) => title !== 'Portfolio')

		.map((l, i) => {
			const Icon = getIcon(l.title);

			return (
				<SocialLink key={`social-link-${l.href}`} href={l.href} tooltip={l.title}>
					<Icon />
				</SocialLink>
			);
		});

	return (
		<div className="lg:w-2/5 max-h-screen">
			<header className="p-4 md:py-16 md:pl-32 h-screen lg:fixed top-0 lg:w-2/5 items-center flex flex-col">
				<div className="w-full">
					<a href={'/'}>
						<TextTicker
							className="font-semibold text-amber-700 tracking-tight mb-2 font-mono text-4xl mr-2 hover:text-amber-600 hover:tracking-normal transition-all duration-200"
							text={`${info.name};`}
						/>
					</a>
					<div className="flex gap-4">
						<div>
							<h2 className="text-xl text-gray-100 font-light mb-4">{info.title}</h2>
							<p className="text-base tracking-wide">{info.tagline}</p>
						</div>
						<nav className="text-right w-full max-lg:hidden">
							<NavLink href="#about">Dan</NavLink>
							<NavLink href="#xp">xp</NavLink>
							<NavLink href="#projects">My Work</NavLink>
						</nav>
					</div>
				</div>

				<div className="flex-1 flex flex-col justify-center">
					<img
						src="/images/danimal-sq.png"
						alt="The 'Danimal' holding his cat in an 80's glam shot"
						className="w-64 max-sm:mx-0 max-sm:w-full sm:float-end ml-2 mb-1 border rounded-full border-slate-400/10"
					/>
				</div>

				<footer className="text-3xl flex gap-8 items-end">
					{links}
					{/* <SocialLink href={info.} tooltip="GitHub">
						<FaGithub />
					</SocialLink>
					<SocialLink href={info.socials.linkedin} tooltip="LinkedIn">
						<FaLinkedin />
					</SocialLink> */}
					<SocialLink href="/resume/pdf" newWindow={false} tooltip="Resume">
						<SiReaddotcv />
					</SocialLink>
				</footer>
			</header>
		</div>
	);
};

export default Header;
