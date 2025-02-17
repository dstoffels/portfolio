'use client';

import { getMonth, getYear } from '@/utils/dateParser';
import ProfessionalInfoModel, { Experience } from '@/data/dbModel';

import * as React from 'react';
import { useState, useEffect } from 'react';
import XPForm from './XPForm';

export type HomeXPProps = {
	xp: Experience;
	index: number;
	isAdmin: boolean;
	info: ProfessionalInfoModel;
};

const HomeXP: React.FC<HomeXPProps> = ({ xp, index, isAdmin, info }) => {
	const [isEditing, setIsEditing] = useState(false);

	const start = getMonth(xp.startDate).short + ' ' + getYear(xp.startDate);
	const end = xp.endDate ? getMonth(xp.endDate).short + ' ' + getYear(xp.endDate) : 'present';

	const tags = xp.tags.map((t) => (
		<span
			key={`tag-${t}`}
			className="text-xs text-cyan-600 font-semibold bg-cyan-600/10 rounded-3xl px-3 py-1.5 text-nowrap"
		>
			{t}
		</span>
	));

	return (
		<div>
			{!isEditing && (
				<div
					className={`flex gap-4 -mx-4 mb-4 p-4 border-t-2 border-t-transparent border-r-2 border-r-transparent hover:border-slate-500/10 rounded-md hover:bg-slate-500/10 duration-300 ease-out`}
				>
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
			)}

			{isAdmin && (
				<div className="flex justify-end">
					<XPForm
						index={index}
						xp={xp}
						info={info}
						btnLabel="Edit"
						onEdit={(isEditing) => setIsEditing(isEditing)}
					/>
				</div>
			)}
		</div>
	);
};

export default HomeXP;
