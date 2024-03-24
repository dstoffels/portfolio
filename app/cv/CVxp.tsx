import P from '@/components/P';
import { FaCode } from 'react-icons/fa';
import { IoIosCalendar } from 'react-icons/io';
import { MdLocationPin } from 'react-icons/md';
import { XpType } from '../types';
import { getMonth, getYear } from '@/utils/dateParser';

const CVxp = ({ xp }: XPProps) => {
	const start = getMonth(xp.start_date).numeric + '/' + getYear(xp.start_date);
	const end = xp.end_date ? getMonth(xp.end_date).numeric + '/' + getYear(xp.end_date) : 'present';

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

export type XPProps = {
	xp: XpType;
};
