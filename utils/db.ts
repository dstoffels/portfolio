'use server';

import ProfessionalInfoModel from '@/data/dbModel';
import { db } from '../utils/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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

export async function fetchDB(docId: 'professionalInfo') {
	const d = doc(db, `portfolio/${docId}`);
	const data = (await getDoc(d)).data();
	if (data) return data as ProfessionalInfoModel;
	await setDB(docId, defaultProfessionalInfo);
	return await fetchDB(docId);
}

export async function setDB(docId: 'professionalInfo', dbObj: ProfessionalInfoModel) {
	const docRef = doc(db, `portfolio/${docId}`);
	await setDoc(docRef, dbObj);
}
