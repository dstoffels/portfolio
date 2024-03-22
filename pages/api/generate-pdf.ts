'use server';

import { NextApiRequest, NextApiResponse } from 'next';
import Chromium from 'chrome-aws-lambda';

export default async function generatePDF(req: NextApiRequest, res: NextApiResponse) {
	const puppeteer = Chromium.puppeteer;
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.setContent(req.body, { waitUntil: 'networkidle0' });
	const pdfBuffer = await page.pdf({
		format: 'a4',
		printBackground: true,
		pageRanges: '1',
		scale: 1,
	});
	await browser.close();

	res.send(pdfBuffer);
}
