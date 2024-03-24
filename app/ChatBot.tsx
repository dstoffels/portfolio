import { IoIosSend } from 'react-icons/io';
import { IoSendSharp } from 'react-icons/io5';

const Chatbot = ({ thread_id }: ChatbotProps) => {
	return (
		<div className="bg-gray-900 p-2 w-full rounded-lg flex-1 flex flex-col mb-10 overflow-y-hidden">
			<h1 className="font-semibold px-4 py-2 text-slate-400">Chat with my AI clone</h1>
			<div className="flex-1 px-2 sm:px-10 md:px-16 lg:px-10 xl:px-16 overflow-y-auto"></div>
			<form action="" className="relative overflow-visible">
				<input
					type="text"
					placeholder="Ask me anything!"
					className="w-full placeholder:text-slate-400/40 text-slate-400 bg-slate-500/25 rounded px-2 py-1 outline-none border-slate-400/10 border focus:border-slate-400/35 "
				/>
				<button className="absolute top-1/2 -translate-y-1/2 -right-2 p-2 rounded-full drop-shadow-md shadow-black shadow-sm  from-blue-500 from-10% via-blue-800 bg-gradient-to-tl to-blue-950 flex items-center justify-center">
					<IoSendSharp className="text-2xl pl-1 text-slate-300" />
				</button>
			</form>
		</div>
	);
};

export default Chatbot;

export type ChatbotProps = {
	thread_id?: string;
};
