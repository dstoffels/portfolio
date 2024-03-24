import { ProjectType } from './types';

const HomeProject = async ({ project, src }: HomeProjectProps) => {
	const href = project.links.find((l) => l.name === 'Website')?.link as string;

	src = `${process.env.BASE_URL}/${src}`;

	return (
		<a href={href} target="_blank">
			<div className="flex mb-2 p-6 gap-4 rounded-md hover:bg-slate-500/10 duration-300 ease-out ">
				<div className="basis-1/4">
					<img src={src} alt={src} />
				</div>
				<div className="basis-3/4">
					<h1 className="font-semibold text-amber-700">{project.name}</h1>
					<p>{project.description}</p>
				</div>
			</div>
		</a>
	);
};

export default HomeProject;

export type HomeProjectProps = {
	project: ProjectType;
	src: string;
};
