'use server';

import { NextApiRequest, NextApiResponse } from 'next';
import chromium from '@sparticuz/chromium-min';
import puppeteerCore from 'puppeteer-core';
import puppeteer from 'puppeteer';

export default async function generatePDF(req: NextApiRequest, res: NextApiResponse) {
	let browser;

	if (process.env.DEV) {
		browser = await puppeteer.launch();
	} else {
		browser = await puppeteerCore.launch({
			executablePath: await chromium.executablePath(),
			args: chromium.args,
			headless: false,
		});
	}

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
