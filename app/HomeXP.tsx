import { getMonth, getYear } from '@/utils/dateParser';
import { XpType } from './types';

const HomeXP = ({ xp }: HomeXPProps) => {
	const start = getMonth(xp.start_date).short + ' ' + getYear(xp.start_date);
	const end = xp.end_date ? getMonth(xp.end_date).short + ' ' + getYear(xp.end_date) : 'present';

	const tags = xp.tags.map((t) => (
		<span
			key={`tag-${t}`}
			className="text-xs text-cyan-600 font-semibold bg-cyan-600/10 rounded-3xl px-3 py-1.5 text-nowrap"
		>
			{t}
		</span>
	));

	return (
		<div className="flex gap-4 -mx-4 mb-4 p-4 border-t-2 border-t-transparent border-r-2 border-r-transparent hover:border-slate-500/10 rounded-md hover:bg-slate-500/10 duration-300 ease-out ">
			<div className="basis-1/4 text-xs font-semibold tracking-wide pt-2">
				<span className="text-nowrap">{start.toUpperCase()}</span>
				<span> - </span>
				<span className="text-nowrap">{end.toUpperCase()}</span>
			</div>
			<div className="basis-3/4">
				<h1 className="font-semibold text-lg mb-1 text-amber-700">{xp.position}</h1>
				<h2 className=" text-slate-300 font-light mb-2">{xp.company}</h2>
				<p className="mb-6 text-sm">{xp.description}</p>
				<div className="flex gap-2 flex-wrap">{tags}</div>
			</div>
		</div>
	);
};

export default HomeXP;

export type HomeXPProps = {
	xp: XpType;
};
