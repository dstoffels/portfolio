import P from '@/components/P';
import { FaCode } from 'react-icons/fa';
import { IoIosCalendar } from 'react-icons/io';
import { MdLocationPin } from 'react-icons/md';
import { getMonth, getYear } from '@/utils/dateParser';
import { Experience } from '@/data/dbModel';

export type XPProps = {
	xp: Experience;
};

const CVxp: React.FC<XPProps> = ({ xp }) => {
	const start = getMonth(xp.startDate).numeric + '/' + getYear(xp.startDate);
	const end = xp.endDate ? getMonth(xp.endDate).numeric + '/' + getYear(xp.endDate) : 'present';

	const responsibilities = xp.responsibilities.map((r, i) => (
		<div key={`res-${i}`} className="mb-0.5 pl-2 text-xs">
			<FaCode className="inline mr-1 align-middle" />
			<span className="align-middle">{r}</span>
		</div>
	));

	return (
		<div className="mb-4">
			<header className="mb-1">
				<div className="flex justify-between items-baseline">
					<h3 className="font-semibold  text-orange-600">{xp.position}</h3>
					<div>
						<IoIosCalendar className="text-sky-700 mr-1 inline" />
						<P className="inline">
							{start} - {end}
						</P>
					</div>
				</div>
				<div className="flex justify-between">
					<h3 className="text-sm font-semibold">{xp.company}</h3>
					<div className="">
						<MdLocationPin className="text-sky-700 mr-1 inline" />
						<P className="inline">{xp.location}</P>
					</div>
				</div>
			</header>
			<div className="">{responsibilities}</div>
		</div>
	);
};

export default CVxp;
