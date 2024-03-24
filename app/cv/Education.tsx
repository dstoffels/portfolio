import P from '@/components/P';
import { IoIosCalendar } from 'react-icons/io';
import { MdLocationPin } from 'react-icons/md';
import { EducationType } from '../types';
import { getMonth, getYear } from '@/utils/dateParser';

const Education = ({ education }: EducationProps) => {
	const start = getMonth(education.start_date).numeric + '/' + getYear(education.start_date);
	const end = education.end_date
		? getMonth(education.end_date).numeric + '/' + getYear(education.end_date)
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
