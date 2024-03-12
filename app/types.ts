import { ThreadMessage } from 'openai/resources/beta/threads/index.mjs';

export type ChatMessage = ThreadMessage & {
	content: {
		type: 'text';
		text: { value: string; annotations: [] };
	}[];
};
