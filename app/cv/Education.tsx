import P from '@/components/P';
import { IoIosCalendar } from 'react-icons/io';
import { MdLocationPin } from 'react-icons/md';
import { EducationType } from '../types';

const Education = ({ education }: EducationProps) => {
	const startDate = new Date(education.start_date);
	const endDate = new Date(education.end_date);

	const startMonth = startDate.getMonth() + 1;
	const endMonth = endDate.getMonth() + 1;

	const start = (startMonth < 10 ? '0' + startMonth : startMonth) + '/' + startDate.getFullYear();
	const end = education.end_date
		? (endMonth < 10 ? '0' + endMonth : endMonth) + '/' + endDate.getFullYear()
		: 'present';

	return (
		<div className="mb-4">
			<div className="flex justify-between">
				<h3 className="font-semibold text-orange-600">{education.degree}</h3>
				<div>
					<IoIosCalendar className="text-sky-700 mr-1 inline" />
					<P className="inline">
						{start} - {end}
					</P>
				</div>
			</div>
			<div className="flex justify-between">
				<h3 className="text-sm">{education.institution}</h3>
				<div>
					<MdLocationPin className="text-sky-700 mr-1 inline" />
					<P className="inline">{education.location}</P>
				</div>
			</div>
		</div>
	);
};

export default Education;

export type EducationProps = {
	education: EducationType;
};
