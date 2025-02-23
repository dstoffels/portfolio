import { CVData } from '../../types';
import { MdEmail, MdLocalPhone, MdLocationPin } from 'react-icons/md';
import { CgWebsite } from 'react-icons/cg';
import CVHeaderLink from './CVHeaderLink';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import ProfessionalInfoModel from '@/data/dbModel';

export type CVHeaderProps = {
	info: ProfessionalInfoModel;
};

const CVHeader: React.FC<CVHeaderProps> = ({ info }) => {
	const links = info.links.map((l, i) => (
		<CVHeaderLink key={`hl-${l.href}`} Icon={getIcon(l.title)} href={l.href}>
			{l.title}
		</CVHeaderLink>
	));

	return (
		<header className="mb-6 text-right">
			<h1 className="text-4xl font-semibold text-sky-900">{info.name}</h1>
			<p className="text-lg text-orange-600 font-semibold">{info.subtitle}</p>

			<div>
				<CVHeaderLink Icon={MdEmail}>{info.email}</CVHeaderLink>
				<CVHeaderLink Icon={MdLocalPhone}>{info.phone}</CVHeaderLink>
				<CVHeaderLink Icon={MdLocationPin}>{info.location}</CVHeaderLink>
			</div>

			<div>{links}</div>
		</header>
	);
};

export default CVHeader;

export function getIcon(linkTitle: string) {
	switch (linkTitle) {
		case 'GitHub':
			return FaGithub;
		case 'LinkedIn':
			return FaLinkedin;
		default:
			return CgWebsite;
	}
}
