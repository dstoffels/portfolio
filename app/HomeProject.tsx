import { Project } from '@/data/dbModel';

const HomeProject = async ({ project, src }: HomeProjectProps) => {
	const href = project.links.find((l) => l.title === 'Website')?.href as string;

	src = `${process.env.BASE_URL}/${src}`;

	return (
		<a href={href} target="_blank">
			<div className="flex mb-4 -mx-4 p-4 gap-4 rounded-md hover:bg-slate-500/10 duration-300 ease-out border-t-2 border-t-transparent border-r-2 border-r-transparent hover:border-slate-500/10">
				<div className="basis-1/4">
					<img src={src} alt={src} />
				</div>
				<div className="basis-3/4">
					<h1 className="font-semibold text-amber-700">{project.title}</h1>
					<p>{project.description}</p>
				</div>
			</div>
		</a>
	);
};

export default HomeProject;

export type HomeProjectProps = {
	project: Project;
	src: string;
};
