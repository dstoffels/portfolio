import BotForm from '@/components/bot-form';
import { createThread } from '../actions';

const BotPage = async ({ params }: { params: { thread_id: string } }) => {
	await createThread();
	return null;
};

export default BotPage;
