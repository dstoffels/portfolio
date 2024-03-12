import BotForm from '@/components/bot-form';

const BotPage = ({ params }: { params: { thread_id: string } }) => {
	const { thread_id } = params;
	return <BotForm thread_id={thread_id} />;
};

export default BotPage;
