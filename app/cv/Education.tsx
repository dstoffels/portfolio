import P from '@/components/P';

const Education = ({ education }: EducationProps) => {
	const startDate = new Date(education.start_date);
	const endDate = new Date(education.end_date);

	const startMonth = startDate.getMonth() + 1;
	const endMonth = endDate.getMonth() + 1;

	const start = (startMonth < 10 ? '0' + startMonth : startMonth) + '/' + startDate.getFullYear();
	const end = (endMonth < 10 ? '0' + startMonth : startMonth) + '/' + endDate.getFullYear();

	return (
		<div className="mb-4">
			<div className="flex justify-between">
				<h3 className="font-semibold">{education.degree}</h3>
				<P>
					{start} - {end}
				</P>
			</div>
			<div className="flex justify-between">
				<h3 className="text-sm text-orange-600">{education.institution}</h3>
				<P>{education.location}</P>
			</div>
		</div>
	);
};

export default Education;

export type CVEducation = {
	degree: string;
	institution: string;
	start_date: string;
	end_date: string;
	location: string;
};

export type EducationProps = {
	education: CVEducation;
};
