'use server';

import yaml from 'yaml';
import fs from 'fs';
import { CVData } from '@/app/cv/types';
import { revalidatePath } from 'next/cache';

export async function fetchCVData() {
	const cvFile = fs.readFileSync('./data/cv.yaml', 'utf-8');
	const data = yaml.parse(cvFile) as CVData;

	revalidatePath('/cv');
	return data;
}
