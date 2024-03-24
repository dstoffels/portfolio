import yaml from 'yaml';
import fs from 'fs';
import { CVData } from '@/app/types';

export function fetchCVData() {
	const cvFile = fs.readFileSync('./data/cv.yaml', 'utf-8');
	const data = yaml.parse(cvFile, { toStringDefaults: {} }) as CVData;

	return data;
}
