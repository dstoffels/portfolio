'use server';

import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

export default async function fetchCvVersion(req: NextApiRequest, res: NextApiResponse) {
	if (process.env.DEV) {
		const jsonFilePath = './scripts/cv-version.json';

		try {
			const data = await fs.promises.readFile(jsonFilePath, 'utf-8');
			const jsonObj = JSON.parse(data);
			res.status(200).send(jsonObj.version);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: 'Failed to read file' });
		}
	} else {
		res.status(400).send('Only available in development');
	}
}
