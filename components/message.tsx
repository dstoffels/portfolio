import { ChatMessage } from '@/app/types';

const Message = ({ message }: { message: ChatMessage }) => {
	const author = message.role === 'assistant' ? 'Dan Stoffels' : 'You';

	return (
		<div>
			<h6 className="text-lg  font-bold">{author}</h6>
			<p className="mb-6">{message.content[0].text.value}</p>
		</div>
	);
};

export default Message;
