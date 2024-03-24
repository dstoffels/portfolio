import { XpType } from './types';

const HomeXP = ({ xp }: HomeXPProps) => {
	const tags = xp.tags.map((t) => (
		<span className="text-xs text-cyan-600 font-semibold bg-cyan-600/10 rounded-3xl px-3 py-1.5  text-nowrap">
			{t}
		</span>
	));

	return (
		<div className="flex mb-2 p-6 hover:border-t hover:border-r border-slate-500/10 rounded-md hover:bg-slate-500/10 duration-300 ease-out ">
			<div className="basis-1/4">{xp.start_date}</div>
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
