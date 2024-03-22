import { NextApiRequest, NextApiResponse } from 'next';
('use server');
import puppeteer from 'puppeteer';

export async function generatePDF(cvElement: string) {}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.setContent(req.body, { waitUntil: 'networkidle0' });
	const pdfBuffer = await page.pdf({
		format: 'A4',
		printBackground: true,
		pageRanges: '1',
		scale: 1,
	});
	await browser.close();

	res.send(pdfBuffer);
}
