import { PropsWithChildren } from 'react';

const Section = ({ id, heading, children }: SectionProps) => {
	return (
		<section id={id} className="mb-8 last:mb-0">
			<h2 className="font-semibold text-lg border-b pb-2 mb-2">{heading.toUpperCase()}</h2>
			{children}
		</section>
	);
};

export default Section;

export type SectionProps = PropsWithChildren & {
	id?: string;
	heading: string;
};
