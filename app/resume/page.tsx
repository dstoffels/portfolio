import CVSection from './components/CVSection';
import CVxp from './components/CVxp';
import CVAchievement from './components/CVAchievement';
import CVEducation from './components/CVEducation';
import P from '@/components/P';

import CVProject from './components/CVProject';
import CVHeader from './components/CVHeader';
import { Inter } from 'next/font/google';
import { fetchDoc } from '@/utils/firebaseActions';
import CVSkillset from './components/CVSkillset';

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	preload: true,
	// Add any weights you're using
	weight: ['400', '500', '600', '700'],
});

export const dynamic = 'force-static';

const CVPage = async ({}) => {
	let info = await fetchDoc('professionalInfo');

	const experience = info.experience
		// .filter((xp, i) => i <= 3)
		.map((xp, i) => <CVxp key={`xp-${i}`} xp={xp} />);

	const education = info.education.map((e, i) => <CVEducation key={`ed-${i}`} education={e} />);

	const achievements = info.achievements.map((a, i) => (
		<CVAchievement key={`ach-${i}`} achievement={a} />
	));

	const skillsets = info.skills.map((ss, i) => <CVSkillset skillset={ss} key={`skillset-${i}`} />);

	const projects = info.projects.map((project, i) => (
		<CVProject key={`proj-${i}`} project={project} />
	));

	return (
		<>
			<link
				rel="preload"
				href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
				as="style"
			/>
			<div className={`w-screen h-full ${inter.className}`}>
				<div className="flex overflow-hidden mx-auto aspect-pdf w-5xl" id="cv">
					<div className="w-1/3 p-10 bg-sky-900 text-white">
						<img
							src={`/images/danimal-sq.png`}
							alt="Image of Dan Stoffels with a cat"
							className="h-32 mx-auto mb-8 rounded-md"
						/>
						<CVSection heading="Projects">{projects}</CVSection>
						<CVSection heading="Skills">{skillsets}</CVSection>
						{/* <CVSection heading="Achievements">{achievements}</CVSection> */}
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
			</div>
		</>
	);
};

export default CVPage;
