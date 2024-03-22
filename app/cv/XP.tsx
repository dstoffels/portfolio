import P from '@/components/P';
import { FaCode } from 'react-icons/fa';

const XP = ({ xp }: XPProps) => {
	const startDate = new Date(xp.start_date);
	const endDate = new Date(xp.end_date);

	const startMonth = startDate.getMonth() + 1;
	const endMonth = endDate.getMonth() + 1;

	const start = (startMonth < 10 ? '0' + startMonth : startMonth) + '/' + startDate.getFullYear();
	const end = (endMonth < 10 ? '0' + startMonth : startMonth) + '/' + endDate.getFullYear();

	const responsibilities = xp.responsibilities.map((r, i) => (
		<div key={`res-${i}`} className="mb-0.5 pl-2 text-xs">
			<FaCode className="inline mr-1 align-middle" />
			<span className="align-middle">{r}</span>
		</div>
	));

	return (
		<div className="mb-4">
			<div className="flex justify-between">
				<h3 className="font-semibold">{xp.position}</h3>
				<P>
					{start} - {end}
				</P>
			</div>
			<div className="flex justify-between">
				<h3 className="text-sm text-orange-600">{xp.company}</h3>
				<P>{xp.location}</P>
			</div>
			<div className="">{responsibilities}</div>
		</div>
	);
};

export default XP;

export type CVExperience = {
	position: string;
	company: string;
	location: string;
	start_date: string;
	end_date: string;
	responsibilities: string[];
};

export type XPProps = {
	xp: CVExperience;
};
