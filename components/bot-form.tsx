import { fetchMsgs, runMsg } from '@/app/actions';
import Message from './message';
import BotTextArea from './BotTextArea';

export default async function BotForm({ thread_id }: { thread_id: string }) {
	const runMsgWthreadId = runMsg.bind(null, thread_id);
	const messages = await fetchMsgs(thread_id);

	const messageList = messages
		?.map((message) => <Message key={message.id} message={message} />)
		.reverse();

	return (
		<div className="flex flex-col h-full">
			<div className="p-6 flex-1 overflow-hidden">{messageList}</div>
			<form id="bot-form" action={runMsgWthreadId} className="px-20 py-10">
				<BotTextArea />
			</form>
		</div>
	);
}
