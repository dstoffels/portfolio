import { FiExternalLink } from 'react-icons/fi';
import { fetchCVData } from './actions';
import HomeXP from './HomeXP';
import Section from './Section';
import HomeProject from './HomeProject';
import { fetchSiteThumbnails } from './actions';
import Header from './header';
import Chatbot from './ChatBot';

export default async function Page({ searchParams }: HomePageProps) {
	const data = await fetchCVData();

	const xp = data.experience.map((xp, i) => <HomeXP xp={xp} key={`xp-${i}`} />);

	const projectLinks = data.projects.map(
		(p) => p.links.find((l) => l.name === 'Website')?.link as string,
	);

	const { thumbnailPaths } = (await fetchSiteThumbnails(projectLinks)) as {
		thumbnailPaths: string[];
	};

	const projects = data.projects.map((p, i) => (
		<HomeProject project={p} src={thumbnailPaths[i]} key={`project-${i}`} />
	));

	return (
		<div className="lg:flex">
			<Header />

			<div className="min-h-screen lg:w-3/5 mx-auto">
				<Section id="about" heading="About">
					<p className="">{data.about}</p>
				</Section>
				{/* <Section id="chat">
					<Chatbot />
				</Section> */}
				<Section id="xp" heading="Experience">
					{xp}
					<a
						className="text-slate-300 p-3 ease-in-out duration-300 hover:text-slate-400"
						href="/cv/dan-stoffels-cv.pdf"
					>
						<span>View Curriculum Vitae</span>
						<FiExternalLink className="inline text-xl ml-2" />
					</a>
				</Section>
				<Section id="projects" heading="Projects">
					{projects}
				</Section>
				<footer className="text-sm p-16 md:px-32 pt-0 text-slate-600">{data.footer}</footer>
			</div>
		</div>
	);
}

export type HomePageProps = {
	searchParams: { thread_id: string };
};
