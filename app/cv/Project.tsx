import P from '@/components/P';
import { CiLink } from 'react-icons/ci';
import { FaLink } from 'react-icons/fa';
import { IoMdLink } from 'react-icons/io';

const Project = ({ project }: ProjectProps) => {
	const links = project.links.map((link, i) => (
		<a
			href={link.link}
			target="_blank"
			key={`${project.name}-link-${i}`}
			className="text-xs block text-orange-500 hover:text-orange-300 underline"
		>
			<IoMdLink className="inline text-orange-500 mr-1" />
			<span>{link.name}</span>
		</a>
	));

	return (
		<div className="mb-2">
			<h3 className="font-semibold text-orange-500">{project.name}</h3>
			<P className="mb-1">{project.description}</P>
			<div>{links}</div>
		</div>
	);
};

export default Project;

export type ProjectProps = {
	project: CVProject;
};

export type CVProject = {
	name: string;
	description: string;
	links: { name: string; link: string }[];
};
