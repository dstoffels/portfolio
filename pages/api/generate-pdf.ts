'use server';

import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';
import fs from 'fs';

export default async function generatePDF(req: NextApiRequest, res: NextApiResponse) {
	if (process.env.DEV) {
		let browser;

		browser = await puppeteer.launch();

		const page = await browser.newPage();

		await page.setContent(req.body, { waitUntil: 'networkidle0' });
		const pdfBuffer = await page.pdf({
			format: 'a4',
			printBackground: true,
			pageRanges: '1',
			scale: 1,
		});
		await browser.close();

		fs.writeFile('public/cv/dan-stoffels-cv.pdf', pdfBuffer, (err) => err && console.log(err));

		console.log('CV PDF created');

		res.status(201).send('CV PDF created');
	} else {
		res.status(400).send('Only available in development');
	}
}
