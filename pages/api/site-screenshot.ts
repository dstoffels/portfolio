'use server';

import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';
import fs from 'fs';

export default async function fetchScreenshot(req: NextApiRequest, res: NextApiResponse) {
	const { urls } = req.body as { urls: string[] };
	const sanitizedUrls = urls.map((url: string) => url.replace(/[^a-z0-9]/gi, '_').toLowerCase());

	try {
		const results = await Promise.all(
			sanitizedUrls.map(async (url) => {
				const file = generateFullPath(url);
				return await fs.promises
					.readFile(file)
					.then((file) => ({ success: true, file }))
					.catch((error) => ({ success: false, file }));
			}),
		);
		const failed = results.filter((r) => r.success === false);
		if (failed.length > 0) throw new Error(`Unable to find: ${failed[0].file}`);
		const thumbnailPaths = sanitizedUrls.map((url) => generateRelativePath(url));
		res.status(200).send(JSON.stringify({ thumbnailPaths }));
	} catch (error) {
		if (process.env.DEV) {
			if (error instanceof Error) console.log(error.message, 'Fetching Screenshots...');
			const browser = await puppeteer.launch();

			const thumbnailPaths = await Promise.all(
				urls.map(async (url, i) => {
					try {
						const page = await browser.newPage();
						await page.goto(url, { waitUntil: 'networkidle0' });
						const path = `thumb-${sanitizedUrls[i]}.png`;
						await page.screenshot({ path: `public/images/${path}` });
						await page.close();
						return `images/${path}`;
					} catch (error) {
						// @ts-ignore
						console.log(`error screenshotting: ${url}`, error.message);
						return '';
					}
				}),
			);

			await browser.close();

			res.status(201).send(JSON.stringify({ thumbnailPaths }));
		} else {
			if (error instanceof Error)
				res
					.status(400)
					.send({ error: error.message, message: 'Cannot generate screenshots in production' });
		}
	}
}

function generateFilename(sanitizedUrl: string) {
	return `thumb-${sanitizedUrl}.png`;
}

function generateRelativePath(sanitizedUrl: string) {
	return `images/${generateFilename(sanitizedUrl)}`;
}

function generateFullPath(sanitizedUrl: string) {
	return `public/images/${generateFilename(sanitizedUrl)}`;
}
