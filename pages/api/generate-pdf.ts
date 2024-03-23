'use server';

import { NextApiRequest, NextApiResponse } from 'next';
import chromium from 'chrome-aws-lambda';
import puppeteerCore from 'puppeteer-core';
import puppeteer from 'puppeteer';

export default async function generatePDF(req: NextApiRequest, res: NextApiResponse) {
	let browser;
	const executablePath = await chromium.executablePath;

	if (executablePath) {
		browser = await puppeteerCore.launch({
			executablePath,
			args: chromium.args,
			headless: false,
		});
	} else {
		browser = await puppeteer.launch();
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
