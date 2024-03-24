import yaml from 'yaml';
import fs from 'fs';
import { CVData } from './types';
import { fetchCVData } from './cv/actions';

export default function Page({ searchParams }: HomePageProps) {
	const data = fetchCVData();

	return (
		<div className="w-2/3 mx-auto">
			<section>{data.about}</section>
			<footer>{data.footer}</footer>
		</div>
	);
}

export type HomePageProps = {
	searchParams: { thread_id: string };
};

export function fetchHomeData() {
	const cvFile = fs.readFileSync('./data/cv.yaml', 'utf-8');
	const data = yaml.parse(cvFile) as CVData;

	return data;
}
