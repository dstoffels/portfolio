'use client';

import ProfessionalInfoModel, { Project } from '@/data/dbModel';
import ProjectForm from './ProjectForm';

export type HomeProjectProps = {
	project: Project;
	index?: number;
	info: ProfessionalInfoModel;
};

const HomeProject: React.FC<HomeProjectProps> = ({ project, index, info }) => {
	const href = project.links[0].href;

	const tags = project.tags.map((t) => (
		<span
			key={`tag-${t}`}
			className="text-xs text-cyan-600 font-semibold bg-cyan-600/10 rounded-3xl px-3 py-1.5 text-nowrap"
		>
			{t}
		</span>
	));

	return (
		<div className="mb-4 -mx-4 p-4 gap rounded-md hover:bg-slate-500/10 duration-300 ease-out border-t-2 border-t-transparent border-r-2 border-r-transparent hover:border-slate-500/10">
			<a href={href} target="_blank">
				<div className="flex gap-4 mb-6">
					<div className="basis-1/4 pt-1">
						<img src={project.base64Img} alt={href} />
					</div>
					<div className="basis-3/4">
						<div className="mb-6">
							<h1 className="font-semibold text-amber-700">{project.title}</h1>
							<p>{project.description}</p>
						</div>
						<div className="flex gap-2 flex-wrap">{tags}</div>
					</div>
				</div>
			</a>
			<div className="flex justify-end">
				<ProjectForm info={info} btnText="Edit" index={index} project={project} />
			</div>
		</div>
	);
};

export default HomeProject;
