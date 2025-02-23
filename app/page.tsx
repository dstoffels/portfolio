import { FiExternalLink } from 'react-icons/fi';
import { editInfoField } from './actions';
import HomeXP from './components/HomeXP';
import Section from './components/Section';
import HomeProject from './components/HomeProject';
import Header from './header';
import { fetchDoc, updateDoc } from '@/utils/firebaseActions';
import EditField from '@/components/EditField';
import { auth } from '@/utils/auth';
import XPForm from './components/XPForm';
import LogoutBtn from './components/LogoutBtn';
import InfoForm from './components/InfoForm';
import Link from 'next/link';
import ProjectForm from './components/ProjectForm';
import SkillsetForm from './components/SkillsetForm';
import { H2, H3 } from '@/components/H';
import EducationForm from './components/EducationForm';

export default async function Page({ searchParams }: HomePageProps) {
	const { isAdmin } = await auth();
	const info = await fetchDoc('professionalInfo');

	const xp = info.experience.map((xp, i) => (
		<HomeXP xp={xp} index={i} key={`xp-${i}`} isAdmin={isAdmin} info={info} />
	));

	// const { thumbnailPaths } = (await fetchSiteThumbnails(projectLinks)) as {
	// 	thumbnailPaths: string[];
	// };

	const projects = info.projects.map((p, i) => (
		<HomeProject isAdmin={isAdmin} info={info} project={p} index={i} key={`project-${i}`} />
	));

	const skillsets = info.skills.map((ss, i) => (
		<SkillsetForm
			key={`skillset-${i}`}
			skillset={ss}
			index={i}
			info={info}
			isAdmin={isAdmin}
			btnLabel="Edit Skillset"
		/>
	));

	const educations = info.education.map((e, i) => (
		<EducationForm
			key={`eduform-${i}`}
			education={e}
			index={i}
			info={info}
			isAdmin={isAdmin}
			btnLabel="Edit"
		/>
	));

	async function editField(newVal: any, key: string) {
		'use server';
		editInfoField(info, key, newVal);
	}

	return (
		<div className="lg:flex">
			<Header />

			<div className="min-h-screen lg:w-3/5 mx-auto">
				<Section id="about" heading="About">
					<InfoForm info={info} isAdmin={isAdmin} />

					<EditField
						name="about"
						label="About"
						canEdit={isAdmin}
						value={info.about}
						onEdit={editField}
					>
						<p>{info.about}</p>
					</EditField>
				</Section>

				<Section id="xp" heading="Experience">
					{xp}
					<div className="mb-6 flex justify-end">
						<XPForm isAdmin={isAdmin} info={info} />
					</div>
					{isAdmin && (
						<>
							<div>
								<H3>SKILLS</H3>

								{skillsets}
								<SkillsetForm isAdmin={isAdmin} info={info} />
							</div>

							<div>
								<H3>EDUCATION</H3>

								{educations}
								<EducationForm isAdmin={isAdmin} info={info} />
							</div>
						</>
					)}

					<a
						className="text-slate-300 p-3 ease-in-out duration-300 hover:text-slate-400"
						href="/resume/pdf"
					>
						<span>View Resume</span>
						<FiExternalLink className="inline text-xl ml-2" />
					</a>
				</Section>

				<Section id="projects" heading="Projects">
					{projects}
					<ProjectForm isAdmin={isAdmin} info={info} />
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
