'use client';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const DownloadBtn = ({}) => {
	const generatePDF = async () => {
		const element = document.getElementById('cv') as HTMLElement;
		document.querySelectorAll('svg').forEach((svg) => (svg.style.transform = 'translateY(2px)'));

		html2canvas(element, { scale: 2 }).then((canvas) => {
			const data = canvas.toDataURL('image/png');
			let doc = new jsPDF('p', 'pt', 'a4');
			doc.addImage(data, 'PNG', 0, 0, 595, 0);
			doc.save('dan-stoffels_cv.pdf');
		});
	};

	return (
		<div className="flex justify-center my-4">
			<button onClick={generatePDF}>Download CV</button>
		</div>
	);
};

export default DownloadBtn;
