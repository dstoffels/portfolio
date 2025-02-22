export type ProfessionalInfoModel = {
	name: string;
	title: string;
	subtitle: string;
	tagline: string;
	email: string;
	phone: string;
	location: string;
	links: Link[];
	pdfDownloadURL: string;
	about: string;
	summary: string;
	experience: Experience[];
	education: Education[];
	skills: Skillset[];
	projects: Project[];
	achievements: Achievement[];
	[key: string]:
		| string
		| Link[]
		| Experience[]
		| Education[]
		| Skillset[]
		| Project[]
		| Achievement[];
};

export type Link = {
	title: string;
	href: string;
};

export type Experience = {
	position: string;
	company: string;
	location: string;
	startDate: string;
	endDate: string;
	responsibilities: string[];
	description: string;
	tags: string[];
};

export type Education = {
	degree: string;
	institution: string;
	startDate: string;
	endDate: string;
	location: string;
};

export type Skill = {
	name: string;
	proficiency: number;
};

export type Skillset = {
	name: string;
	skills: Skill[];
};

export type Project = {
	title: string;
	description: string;
	base64Img?: string;
	links: Link[];
	tags: string[];
};

export type Achievement = {
	title: string;
	description: string;
	company: string;
	year: number;
};

export default ProfessionalInfoModel;
