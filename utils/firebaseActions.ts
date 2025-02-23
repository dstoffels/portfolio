'use server';

import ProfessionalInfoModel from '@/data/dbModel';
import { db, storage } from '../utils/firebaseConfig';
import { revalidatePath } from 'next/cache';
import { api } from './nexios';

const defaultProfessionalInfo: ProfessionalInfoModel = {
	name: '',
	title: '',
	subtitle: '',
	tagline: '',
	email: '',
	phone: '',
	location: '',
	summary: '',
	links: [],
	pdfDownloadURL: '',
	about: '',
	experience: [],
	education: [],
	skills: [],
	projects: [],
	achievements: [],
};

export async function fetchDoc(docId: 'professionalInfo') {
	const docRef = db.collection('portfolio').doc(docId);
	const docSnap = await docRef.get();

	if (docSnap.exists) return docSnap.data() as ProfessionalInfoModel;
	else {
		await updateDoc(docId, defaultProfessionalInfo);
		return await fetchDoc(docId);
	}
}

export async function updateDoc(
	docId: 'professionalInfo',
	dbObj: ProfessionalInfoModel,
	revalidate = true,
) {
	const docRef = db.collection('portfolio').doc(docId);

	// clean incoming obj to prevent breaking of db
	const validKeys = new Set(Object.keys(defaultProfessionalInfo));
	const prunedObj = Object.fromEntries(Object.entries(dbObj).filter(([key]) => validKeys.has(key)));

	await docRef.set(prunedObj);

	revalidate && revalidatePath('/');
}

export async function updatePDF(
	docId: 'professionalInfo',
	dbObj: ProfessionalInfoModel,
	pdfName = 'dan-stoffels-resume',
) {
	await updateDoc(docId, dbObj);

	const response = await api.get(`/pdf/${pdfName}`);
	console.log(response.data);
}

export async function storeFile(fileBuffer: ArrayBufferLike, path: string): Promise<string> {
	try {
		const bucket = storage.bucket();

		const file = bucket.file(path);

		await file.delete({ ignoreNotFound: true });

		await file.save(Buffer.from(fileBuffer), {
			contentType: 'application/pdf',
			public: true,
			resumable: false,
			timeout: 10000,
		});

		await file.setMetadata({
			cacheControl: 'no-cache, no-store, must-revalidate',
		});

		return `https://storage.googleapis.com/${bucket.name}/${path}?t=${Date.now()}`;
	} catch (error) {
		console.error('Firebase upload failed:', error);
		throw error;
	}
}
