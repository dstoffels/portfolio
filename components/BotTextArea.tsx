'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { BsArrowUpSquareFill } from 'react-icons/bs';

const BotForm = ({ onSubmit }: { onSubmit: (formData: FormData) => Promise<void> }) => {
	const { pending, method } = useFormStatus();

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			const form = document.getElementById('bot-form') as HTMLFormElement;
			form.requestSubmit();
		}
	};

	return (
		<form id="bot-form" action={onSubmit} className="px-36 h-24 bg-zinc-800 fixed w-full bottom-0">
			<div className="border-zinc-600 border rounded-2xl border-solid px-4 py-3 flex">
				<textarea
					rows={1}
					name="content"
					onChange={(e) => autoExpand(e.target)}
					onKeyDown={handleKeyDown}
					className="w-full bg-transparent focus:outline-none resize-none placeholder:text-zinc-500"
					placeholder="Ask me anything!"
				/>
				<button type="submit" aria-disabled={pending}>
					<BsArrowUpSquareFill size={25} className={pending ? 'text-zinc-700' : 'text-inherit'} />
				</button>
			</div>
		</form>
	);
};

export default BotForm;
function autoExpand(textarea: HTMLTextAreaElement) {
	textarea.style.height = 'auto';
	textarea.style.height = textarea.scrollHeight + 'px';
}

('block w-full rounded-md border-0 py-1.5 px-5 text-white-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-black');
('- Only reference my personal information from retrieval files provided.');
