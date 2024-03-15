import { fetchMsgs, runMsg } from '@/app/actions';
import Message from '@/components/message';
import BotForm from '@/components/BotTextArea';

export default async function BotPage({ params }: { params: { thread_id: string } }) {
	const { thread_id } = params;

	const runMsgWthreadId = runMsg.bind(null, thread_id);
	const messages = await fetchMsgs(thread_id);

	const messageList = messages
		?.map((message) => <Message key={message.id} message={message} />)
		.reverse();

	return (
		<div className="max-h-full">
			<div className=" h-full overflow-y-auto px-48 mb-36 scroll-smooth">{messageList}</div>
			<BotForm onSubmit={runMsgWthreadId} />
		</div>
	);
}
