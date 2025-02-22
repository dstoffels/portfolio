'use server';

import ProfessionalInfoModel from '@/data/dbModel';
import { db, storage } from '../utils/firebaseConfig';
import { revalidatePath } from 'next/cache';

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

export async function storeFile(fileBuffer: ArrayBufferLike, path: string): Promise<string> {
	try {
		const bucket = storage.bucket();

		const file = bucket.file(path);

		file.delete();

		await file.save(Buffer.from(fileBuffer), {
			contentType: 'application/pdf',
			public: true,
		});

		return `https://storage.googleapis.com/${bucket.name}/${path}`;
	} catch (error) {
		console.error('Firebase upload failed:', error);
		throw error;
	}
}
