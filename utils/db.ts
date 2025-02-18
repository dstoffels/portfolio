'use server';

import ProfessionalInfoModel from '@/data/dbModel';
import { db } from '../utils/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
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
	about: '',
	experience: [],
	education: [],
	skills: [],
	projects: [],
	achievements: [],
};

export async function fetchDoc(docId: 'professionalInfo') {
	const d = doc(db, `portfolio/${docId}`);
	const data = (await getDoc(d)).data();
	if (data) return data as ProfessionalInfoModel;
	await updateDoc(docId, defaultProfessionalInfo);
	return await fetchDoc(docId);
}

export async function updateDoc(docId: 'professionalInfo', dbObj: ProfessionalInfoModel) {
	const docRef = doc(db, `portfolio/${docId}`);

	// clean incoming obj to prevent breaking of db
	const validKeys = new Set(Object.keys(defaultProfessionalInfo));
	const prunedObj = Object.fromEntries(Object.entries(dbObj).filter(([key]) => validKeys.has(key)));

	await setDoc(docRef, prunedObj);
	revalidatePath('/');
}
