import { PropsWithChildren } from 'react';

const Section = ({ heading, id, children, className }: SectionProps) => {
	return (
		<section
			id={id}
			className={`${className} mb-8 min-h-screen flex flex-col justify-center px-8 sm:px-20 md:px-32`}
		>
			<div>
				{heading && (
					<h1 className="tracking-widest lg:hidden mb-4 font-bold text-slate-300">
						{heading.toUpperCase()}
					</h1>
				)}
				{children}
			</div>
		</section>
	);
};

export default Section;

export type SectionProps = PropsWithChildren & {
	heading?: string;
	id?: string;
	className?: string;
};
