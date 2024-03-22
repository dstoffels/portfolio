'use server';
import puppeteer from 'puppeteer';
import { join } from 'path';
import { tmpdir } from 'os';
import fs from 'fs';

export async function generatePDF(cvElement: string) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.setContent(cvElement, { waitUntil: 'networkidle0' });
	const pdfBuffer = await page.pdf({ format: 'A4' });
	await browser.close();

	const filePath = join(tmpdir(), 'dan-stoffels-cv.pdf');
	await fs.writeFile(filePath, pdfBuffer);
}
