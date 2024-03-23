'use server';

import Section from './Section';
import XP from './XP';
import Achievement from './Achievement';
import Skill from './Skill';
import Education from './Education';
import P from '@/components/P';
import Cert from './Cert';
import { MdEmail, MdLocalPhone, MdLocationPin } from 'react-icons/md';
import { CgWebsite } from 'react-icons/cg';
import DownloadBtn from './DownloadBtn';
import Project from './Project';
import { fetchCVData } from './actions';
import DevUpdater from './DevUpdater';

const BASE_URL = process.env.BASE_URL;

const CVPage = ({}) => {
	let data = fetchCVData();

	const experience = data.experience.map((xp, i) => <XP key={`xp-${i}`} xp={xp} />);
	const education = data.education.map((e, i) => <Education key={`ed-${i}`} education={e} />);

	const achievements = data.achievements.map((a, i) => (
		<Achievement key={`ach-${i}`} achievement={a} />
	));

	const languages = data.skills.languages.map((skill, i) => (
		<Skill key={`sk1-${i}`} skill={skill} />
	));
	const frameworks = data.skills.frameworks.map((skill, i) => (
		<Skill key={`sk2-${i}`} skill={skill} />
	));
	const devops = data.skills.devops.map((skill, i) => <Skill key={`sk3-${i}`} skill={skill} />);

	const certifications = data.certifications.map((cert, i) => (
		<Cert key={`cert-${i}`} cert={cert} />
	));

	const projects = data.projects.map((project, i) => (
		<Project key={`proj-${i}`} project={project} />
	));

	return (
		<div className="my-2 mx-auto">
			<div className="flex overflow-hidden aspect-pdf w-5xl print:" id="cv">
				<div className="w-2/3 p-10 bg-white text-black">
					<header className="mb-8 text-right">
						<h1 className="text-4xl font-semibold">{data.name}</h1>
						<p className="text-lg text-orange-600">{data.subtext}</p>

						<div className="pb-2">
							{data.email && (
								<span className="mr-4 pb-2">
									<MdEmail className="text-sky-700 mr-1 inline align-middle" />
									<span className="text-xs align-middle">{data.email}</span>
								</span>
							)}

							{data.phone && (
								<span className="mr-4">
									<MdLocalPhone className="text-sky-700 mr-1 inline align-middle" />
									<span className="text-xs align-middle">{data.phone}</span>
								</span>
							)}

							{data.website && (
								<a href={data.website.link} className="mr-4">
									<CgWebsite className="text-sky-700 mr-1 inline align-middle" />
									<span className="text-xs align-middle">{data.website.title}</span>
								</a>
							)}

							{data.location && (
								<span className="mr-4">
									<MdLocationPin className="text-sky-700 mr-1 inline align-middle" />
									<span className="text-xs align-middle">{data.location}</span>
								</span>
							)}
						</div>
					</header>
					<Section heading="Summary">
						<P>{data.summary}</P>
					</Section>
					<Section heading="Experience">{experience}</Section>
					<Section heading="Education">{education}</Section>
				</div>
				<div className="w-1/3 p-10 bg-sky-900 text-white">
					<img
						src={`${BASE_URL}/images/danimal-sq.png`}
						alt="Image of Dan Stoffels with a cat"
						className="h-32 mx-auto mb-8 rounded-md"
					/>
					<Section heading="Achievements">{achievements}</Section>
					<Section heading="Skills">
						<div className="mb-3">
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
						</div>
					</Section>
					<Section heading="Projects">{projects}</Section>
					<Section heading="Certifications">{certifications}</Section>
				</div>
			</div>
			<DownloadBtn baseUrl={process.env.BASE_URL as string} />
			{process.env.DEV && <DevUpdater />}
		</div>
	);
};

export default CVPage;
