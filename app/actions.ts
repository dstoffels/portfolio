'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import OpenAI from 'openai';
import { ChatMessage } from './types';
import yaml from 'yaml';
import fs from 'fs';
import { CVData } from '@/app/types';
import path from 'path';

const openai = new OpenAI();

export async function createThread() {
	const thread = await openai.beta.threads.create();
	redirect(`/bot/${thread.id}`);
}

export async function runMsg(thread_id: string, formData: FormData) {
	const content = formData.get('content') as string;
	const assistant_id = process.env.OPENAI_ASSISTANT_ID as string;

	const message = await openai.beta.threads.messages.create(thread_id, { role: 'user', content });

	let run = await openai.beta.threads.runs.create(thread_id, {
		assistant_id,
		additional_instructions: 'Skip annotations',
	});

	while (run.status !== 'completed') {
		await sleep(2000);
		run = await openai.beta.threads.runs.retrieve(thread_id, run.id);
		console.log(run.status);
	}

	revalidatePath(`/bot/${thread_id}`);
	formData.set('content', '');
}

export async function fetchMsgs(thread_id: string) {
	if (thread_id) return (await openai.beta.threads.messages.list(thread_id)).data as ChatMessage[];
}

export async function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchCVData() {
	const filePath = path.join(process.cwd(), 'data', 'cv.yaml');
	const cvFile = fs.readFileSync(filePath, 'utf-8');
	const data = yaml.parse(cvFile, { toStringDefaults: {} }) as CVData;

	return data;
}

export async function fetchSiteThumbnails(urls: string[]) {
	try {
		const response = await fetch(`${process.env.BASE_URL}/api/site-screenshot`, {
			method: 'POST',
			cache: 'no-cache',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ urls }),
		});

		const body = (await response.json()) as { thumbnailPaths: string[] };

		return body;
	} catch (error) {
		console.log('error in fetchSiteThumbnail:', error);
		return { thumbnailPaths: [''] };
	}
}
