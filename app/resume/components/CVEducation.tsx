import P from '@/components/P';
import { IoIosCalendar } from 'react-icons/io';
import { MdLocationPin } from 'react-icons/md';
import { getMonth, getYear } from '@/utils/dateParser';
import { Education } from '@/data/dbModel';

export type EducationProps = {
	education: Education;
};

const CVEducation: React.FC<EducationProps> = ({ education }) => {
	const start = getMonth(education.startDate).numeric + '/' + getYear(education.startDate);
	const end = education.endDate
		? getMonth(education.endDate).numeric + '/' + getYear(education.endDate)
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

export default CVEducation;
