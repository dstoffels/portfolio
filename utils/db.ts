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
	links: [],
	about: '',
	summary: '',
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
	await setDoc(docRef, dbObj);
	revalidatePath('/');
}
