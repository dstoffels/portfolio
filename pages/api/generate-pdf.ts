'use server';

import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

export default async function generatePDF(req: NextApiRequest, res: NextApiResponse) {
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});
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
