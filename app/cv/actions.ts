import yaml from 'yaml';
import fs from 'fs';
import { CVData } from '@/app/cv/types';

export function fetchCVData() {
	const cvFile = fs.readFileSync('./data/cv.yaml', 'utf-8');
	const data = yaml.parse(cvFile) as CVData;

	return data;
}
