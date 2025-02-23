import P from '@/components/P';
import { IoMdLink } from 'react-icons/io';
import { Project } from '@/data/dbModel';

export type ProjectProps = {
	project: Project;
};

const CVProject = ({ project }: ProjectProps) => {
	const links = project.links.map((link, i) => (
		<a
			href={link.href}
			target="_blank"
			key={`${project.title}-link-${i}`}
			className="ml-2 text-xs block text-orange-500 hover:text-orange-300 underline"
		>
			<IoMdLink className="inline text-orange-500 mr-1" />
			<span>{link.title}</span>
		</a>
	));

	return (
		<div className="mb-5 last:mb-0">
			<h3 className="font-semibold text-orange-500">{project.title}</h3>
			<P className="mb-1">{project.description}</P>
			<div>{links}</div>
		</div>
	);
};

export default CVProject;
