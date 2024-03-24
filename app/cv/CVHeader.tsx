import { CVData } from '../types';
import { MdEmail, MdLocalPhone, MdLocationPin } from 'react-icons/md';
import { CgWebsite } from 'react-icons/cg';
import CVHeaderLink from './CVHeaderLink';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const CVHeader = ({ data }: CVHeaderProps) => {
	return (
		<header className="mb-6 text-right">
			<h1 className="text-4xl font-semibold text-sky-900">{data.name}</h1>
			<p className="text-lg text-orange-600 font-semibold">{data.subtext}</p>

			<div>
				<CVHeaderLink Icon={MdEmail}>{data.email}</CVHeaderLink>
				<CVHeaderLink Icon={MdLocalPhone}>{data.phone}</CVHeaderLink>
				<CVHeaderLink Icon={MdLocationPin}>{data.location}</CVHeaderLink>
			</div>
			<div>
				<CVHeaderLink Icon={CgWebsite} href={data.website.link}>
					{data.website.title}
				</CVHeaderLink>
				<CVHeaderLink Icon={FaGithub} href={data.socials.github}>
					GitHub
				</CVHeaderLink>
				<CVHeaderLink Icon={FaLinkedin} href={data.socials.linkedin}>
					LinkedIn
				</CVHeaderLink>
			</div>
		</header>
	);
};

export default CVHeader;

export type CVHeaderProps = {
	data: CVData;
};
