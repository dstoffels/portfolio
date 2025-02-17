'use server';

import CVSection from './CVSection';
import CVxp from './CVxp';
import Achievement from './Achievement';
import Skill from './Skill';
import CVEducation from './CVEducation';
import P from '@/components/P';
import Cert from './Cert';

import DownloadBtn from './DownloadBtn';
import Project from './Project';
import { fetchCVData } from '../actions';
import DevUpdater from './DevUpdater';
import CVHeader from './CVHeader';
import { fetchDoc } from '@/utils/db';

const BASE_URL = process.env.BASE_URL;

const CVPage = async ({}) => {
	let info = await fetchDoc('professionalInfo');

	const experience = info.experience.map((xp, i) => <CVxp key={`xp-${i}`} xp={xp} />);
	const education = info.education.map((e, i) => <CVEducation key={`ed-${i}`} education={e} />);

	const achievements = info.achievements.map((a, i) => (
		<Achievement key={`ach-${i}`} achievement={a} />
	));

	// const languages = info.skills.languages.map((skill, i) => (
	// 	<Skill key={`sk1-${i}`} skill={skill} />
	// ));
	// const frameworks = info.skills.frameworks.map((skill, i) => (
	// 	<Skill key={`sk2-${i}`} skill={skill} />
	// ));
	// const devops = info.skills.devops.map((skill, i) => <Skill key={`sk3-${i}`} skill={skill} />);

	// const certifications = info.certifications.map((cert, i) => (
	// 	<Cert key={`cert-${i}`} cert={cert} />
	// ));

	// const projects = info.projects.map((project, i) => (
	// 	<Project key={`proj-${i}`} project={project} />
	// ));

	return (
		<div className="w-screen h-full">
			<DownloadBtn baseUrl={process.env.BASE_URL as string} />
			<div className="flex overflow-hidden mx-auto aspect-pdf w-5xl" id="cv">
				<div className="w-1/3 p-10 bg-sky-900 text-white">
					<img
						src={`${BASE_URL}/images/danimal-sq.png`}
						alt="Image of Dan Stoffels with a cat"
						className="h-32 mx-auto mb-8 rounded-md"
					/>
					<CVSection heading="Achievements">{achievements}</CVSection>
					<CVSection heading="Skills">
						{/* <div className="mb-3">
							<h3 className="font-semibold mb-1 text-orange-500">Languages</h3>
							<div>{languages}</div>
						</div>
						<div className="mb-3">
							<h3 className="font-semibold mb-1 text-orange-500">Frameworks</h3>
							<div>{frameworks}</div>
						</div>
						<div className="mb-3">
							<h3 className="font-semibold mb-1 text-orange-500">DevOps</h3>
							<div>{devops}</div>
						</div> */}
					</CVSection>
					{/* <CVSection heading="Projects">{projects}</CVSection> */}
					{/* <CVSection heading="Certifications">{certifications}</CVSection> */}
				</div>
				<div className="w-2/3 p-10 bg-white text-black">
					<CVHeader info={info} />
					<CVSection heading="Summary">
						<P>{info.summary}</P>
					</CVSection>
					<CVSection heading="Experience">{experience}</CVSection>
					<CVSection heading="Education">{education}</CVSection>
				</div>
			</div>
			{process.env.DEV && <DevUpdater />}
		</div>
	);
};

export default CVPage;
