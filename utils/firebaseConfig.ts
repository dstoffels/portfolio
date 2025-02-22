import * as admin from 'firebase-admin';

if (!admin.apps.length) {
	const serviceAccount = JSON.parse(
		Buffer.from(process.env.FB_SERVICE_ACCOUNT_KEY, 'base64').toString('utf-8'),
	);

	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		storageBucket: process.env.FB_STORAGE_BUCKET,
	});
}

const storage = admin.storage();
const db = admin.firestore();

export { db, storage };
