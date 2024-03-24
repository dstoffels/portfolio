import { ThreadMessage } from 'openai/resources/beta/threads/index.mjs';

export type CVData = {
	name: string;
	subtitle: string;
	subtext: string;
	tagline: string;
	email: string;
	phone: string;
	location: string;
	website: { title: string; link: string };
	socials: { linkedin: string; facebook: string; instagram: string; github: string };
	about: string;
	summary: string;
	experience: XpType[];
	education: EducationType[];
	achievements: AchievementType[];
	skills: { languages: SkillType[]; frameworks: SkillType[]; devops: SkillType[] };
	projects: ProjectType[];
	certifications: CertType[];
	footer: string;
};

export type XpType = {
	position: string;
	company: string;
	location: string;
	start_date: string;
	end_date: string;
	responsibilities: string[];
	description: string;
	tags: string[];
};

export type EducationType = {
	degree: string;
	institution: string;
	start_date: string;
	end_date: string;
	location: string;
};

export type AchievementType = {
	title: string;
	description: string;
	year: number;
	company: string;
};

export type SkillType = {
	name: string;
	proficiency: number;
};

export type ProjectType = {
	name: string;
	description: string;
	links: { name: string; link: string }[];
};

export type CertType = {
	name: string;
	institution: string;
	date: string;
	description: string;
};

export type ChatMessage = ThreadMessage & {
	content: {
		type: 'text';
		text: { value: string; annotations: [] };
	}[];
};
