import { createThread, fetchMsgs, runMsg } from '@/app/actions';
import { revalidatePath } from 'next/cache';
import Message from './message';

export default async function BotForm({ thread_id }: { thread_id: string }) {
	const runMsgWthreadId = runMsg.bind(null, thread_id);
	const messages = await fetchMsgs(thread_id);

	const messageList = messages?.map((message) => <Message message={message} />).reverse();

	return (
		<div>
			<div className="p-6">{messageList}</div>
			<form action={runMsgWthreadId}>
				<input
					type="text"
					name="content"
					className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-white-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-black"
				/>
			</form>
		</div>
	);
}
