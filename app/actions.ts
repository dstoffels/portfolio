'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
// import { ChatMessage } from './types';
import yaml from 'yaml';
import fs from 'fs';
import { CVData } from '@/app/types';
import path from 'path';
import { cookies } from 'next/headers';
import ProfessionalInfoModel from '@/data/dbModel';
import { updatePDF } from '@/utils/firebaseActions';

export async function editInfoField<K extends keyof ProfessionalInfoModel>(
	info: ProfessionalInfoModel,
	key: K,
	newVal: ProfessionalInfoModel[K],
) {
	info[key] = newVal;
	await updatePDF('professionalInfo', info);
}

export async function logoutAdmin() {
	cookies().delete('admin');
}

export async function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchCVData() {
	const filePath = path.join(process.cwd(), 'data', 'cv.yaml');
	const cvFile = fs.readFileSync(filePath, 'utf-8');
	const data = yaml.parse(cvFile, { toStringDefaults: {} }) as CVData;

	return data;
}

export async function fetchSiteThumbnail(url: string) {
	try {
		const response = await fetch(`${process.env.BASE_URL}/api/site-screenshot`, {
			method: 'POST',
			cache: 'no-cache',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ url }),
		});

		const body = (await response.json()) as { thumbnailPaths: string[] };

		return body;
	} catch (error) {
		console.log('error in fetchSiteThumbnail:', error);
		return { thumbnailPaths: [''] };
	}
}
