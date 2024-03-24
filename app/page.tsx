import { FiExternalLink } from 'react-icons/fi';
import { fetchCVData } from './actions';
import HomeXP from './HomeXP';
import Section from './Section';
import HomeProject from './HomeProject';
import { fetchSiteThumbnails } from './actions';

export default async function Page({ searchParams }: HomePageProps) {
	const data = await fetchCVData();

	const xp = data.experience.map((xp, i) => <HomeXP xp={xp} key={`xp-${i}`} />);

	const projectLinks = data.projects.map(
		(p) => p.links.find((l) => l.name === 'Website')?.link as string,
	);

	const { thumbnailPaths } = (await fetchSiteThumbnails(projectLinks)) as {
		thumbnailPaths: string[];
	};

	// const projects = data.projects.map((p, i) => (
	// 	<HomeProject project={p} src={thumbnailPaths[i]} key={`project-${i}`} />
	// ));

	return (
		<div className="lg:w-2/3 p-4 mx-auto">
			<Section id="about" heading="About">
				<img
					src="/images/danimal-sq.png"
					alt="The 'Danimal' holding his cat in an 80's glam shot"
					className="w-64 inline max-sm:mx-0 max-sm:w-full sm:float-end ml-2 mb-1 border rounded-xl border-slate-400/10"
				/>
				<p>{data.about}</p>
			</Section>
			<Section id="xp" heading="Experience">
				{xp}
				<a className="text-slate-300 p-3 ease-in-out duration-300 hover:text-blue-400" href="/cv">
					<span>View Curriculum Vitae</span>
					<FiExternalLink className="inline text-xl ml-2" />
				</a>
			</Section>
			<Section id="projects" heading="Projects">
				{/* {projects} */}
			</Section>
			<footer className="text-sm text-slate-600">{data.footer}</footer>
		</div>
	);
}

export type HomePageProps = {
	searchParams: { thread_id: string };
};
