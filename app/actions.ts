'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import OpenAI from 'openai';
import { ChatMessage } from './types';
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
