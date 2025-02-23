import { fetchDoc, storeFile, updateDoc } from '@/utils/firebaseActions';
import { storage } from '@/utils/firebaseConfig';
import { browserless, nexios } from '@/utils/nexios';
import startNgrok from '@/utils/ngrok';
import { Listener } from '@ngrok/ngrok';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	console.log('Begin PDF generation...');
	const fileName = req.query.fileName;

	let url: string | null;
	let ngrokListener: Listener | null = null;

	if (process.env.NODE_ENV === 'development') {
		ngrokListener = await startNgrok();
		url = ngrokListener.url();
		console.log('[DEV] Ngrok tunnel opened...');
	} else {
		url = process.env.NEXT_PUBLIC_SITE_URL;
	}
	url += '/resume';

	console.log('Requesting PDF generation from browserless.io...');

	try {
		const response = await browserless.post<ArrayBufferLike>(
			'/pdf',
			{
				url,
				setExtraHTTPHeaders: {
					'ngrok-skip-browser-warning': 'true',
				},
				options: {
					format: 'A4',
					printBackground: true,
					pageRanges: '1',
					timeout: 20000,
				},
				gotoOptions: {
					waitUntil: 'networkidle0',
				},
			},
			{ responseType: 'arraybuffer' },
		);

		console.log('PDF received, storing file...');

		const pdfDownloadURL = await storeFile(response.data, `cv/${fileName}.pdf`);

		const info = await fetchDoc('professionalInfo');
		info.pdfDownloadURL = pdfDownloadURL;
		await updateDoc('professionalInfo', info, false);

		console.log(`File stored at: ${pdfDownloadURL}`);

		res.status(response.status).send({ pdfDownloadURL });
		storage;
	} catch (error) {
		console.log((error as Error).message);
		res.status(500).json({ error });
	} finally {
		if (ngrokListener) {
			await ngrokListener.close();
			console.log('Ngrok tunnel closed');
		}
	}
}
