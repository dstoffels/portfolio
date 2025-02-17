import { FiExternalLink } from 'react-icons/fi';
import { fetchCVData, logoutAdmin } from './actions';
import HomeXP from './components/HomeXP';
import Section from './components/Section';
import HomeProject from './components/HomeProject';
import { fetchSiteThumbnails } from './actions';
import Header from './header';
import { fetchDoc, updateDoc } from '@/utils/db';
import EditField from '@/components/EditField';
import { auth } from '@/utils/auth';
import XPForm from './components/XPForm';
import Button from '@/components/Button';
import LogoutBtn from './components/LogoutBtn';

export default async function Page({ searchParams }: HomePageProps) {
	const { isAdmin } = await auth();
	const info = await fetchDoc('professionalInfo');

	const xp = info.experience.map((xp, i) => (
		<HomeXP xp={xp} index={i} key={`xp-${i}`} isAdmin={isAdmin} info={info} />
	));

	const projectLinks = info.projects.map(
		(p) => p.links.find((l) => l.title === 'Website')?.href as string,
	);

	// const { thumbnailPaths } = (await fetchSiteThumbnails(projectLinks)) as {
	// 	thumbnailPaths: string[];
	// };

	const projects = info.projects.map((p, i) => (
		<HomeProject project={p} src={''} key={`project-${i}`} />
	));

	async function editAbout(newVal: string | number) {
		'use server';
		info.about = newVal as string;
		await updateDoc('professionalInfo', info);
	}

	return (
		<div className="lg:flex">
			<Header />

			<div className="min-h-screen lg:w-3/5 mx-auto">
				<Section id="about" heading="About">
					<EditField canEdit={isAdmin} value={info.about} onEdit={editAbout}>
						<p>{info.about}</p>
					</EditField>
				</Section>
				<Section id="xp" heading="Experience">
					{xp}
					<XPForm info={info} />
					<a
						className="text-slate-300 p-3 ease-in-out duration-300 hover:text-slate-400"
						href="/cv/dan-stoffels-cv.pdf"
					>
						<span>View Resume</span>
						<FiExternalLink className="inline text-xl ml-2" />
					</a>
				</Section>
				<Section id="projects" heading="Projects">
					{projects}
				</Section>
				{/* <footer className="text-sm p-16 md:px-32 pt-0 text-slate-600">{data.footer}</footer> */}
			</div>

			<LogoutBtn isAdmin={isAdmin} />
		</div>
	);
}

export type HomePageProps = {
	searchParams: { thread_id: string };
};
