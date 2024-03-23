import { CVAchievement } from './Achievement';
import { CVCertification } from './Cert';
import { CVEducation } from './Education';
import { CVProject } from './Project';
import { CVSkill } from './Skill';
import { CVExperience } from './XP';

export type CVData = {
	name: string;
	subtext: string;
	email: string;
	phone: string;
	location: string;
	website: { title: string; link: string };
	socials: { linkedin: string; facebook: string; instagram: string };
	summary: string;
	experience: CVExperience[];
	education: CVEducation[];
	skills: CVSkills;
	certifications: CVCertification[];
	achievements: CVAchievement[];
	projects: CVProject[];
};

export type CVSkills = {
	languages: CVSkill[];
	frameworks: CVSkill[];
	devops: CVSkill[];
};
