import yaml from 'yaml';
import fs from 'fs';
import Section from './Section';
import XP, { CVExperience } from './XP';
import Achievement, { CVAchievement } from './Achievement';
import Skill, { CVSkill } from './Skill';
import Education, { CVEducation } from './Education';
import P from '@/components/P';
import Cert, { CVCertification } from './Cert';
import { MdEmail, MdLocalPhone, MdLocationPin } from 'react-icons/md';
import { CgWebsite } from 'react-icons/cg';
import DownloadBtn from './DownloadBtn';

const CVPage = ({}) => {
	const cvFile = fs.readFileSync('./data/cv.yaml', 'utf-8');
	const data = yaml.parse(cvFile) as CVData;

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

	return (
		<div className="my-2 mx-auto">
			<div className="flex overflow-hidden aspect-pdf w-5xl" id="cv">
				<div className="w-2/3 p-10 bg-white text-black">
					<div className="mb-8">
						<h1 className="text-3xl font-semibold">{data.name}</h1>
						<p className="text-lg text-orange-600 mb-2">{data.subtext}</p>

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
								<a href={data.website} target="_blank" className="mr-4">
									<CgWebsite className="text-sky-700 mr-1 inline align-middle" />
									<span className="text-xs align-middle">{data.website}</span>
								</a>
							)}

							{data.location && (
								<span className="mr-4">
									<MdLocationPin className="text-sky-700 mr-1 inline align-middle" />
									<span className="text-xs align-middle">{data.location}</span>
								</span>
							)}
						</div>
					</div>
					<Section heading="Summary">
						<P>{data.summary}</P>
					</Section>
					<Section heading="Experience">{experience}</Section>
					<Section heading="Education">{education}</Section>
				</div>
				<div className="w-1/3 p-10 bg-sky-900 text-white">
					<img src="danimal-sq.png" alt="" className="h-32 mx-auto mb-8 rounded-md" />
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
					<Section heading="Certifications">{certifications}</Section>
				</div>
			</div>
			<DownloadBtn />
		</div>
	);
};

export default CVPage;

export type CVData = {
	name: string;
	subtext: string;
	email: string;
	phone: string;
	location: string;
	website: string;
	socials: { linkedin: string; facebook: string; instagram: string };
	summary: string;
	experience: CVExperience[];
	education: CVEducation[];
	skills: CVSkills;
	certifications: CVCertification[];
	achievements: CVAchievement[];
};

export type CVSkills = {
	languages: CVSkill[];
	frameworks: CVSkill[];
	devops: CVSkill[];
};
