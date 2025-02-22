'use client';

const DownloadBtn = ({ baseUrl }: DownloadBtnProps) => {
	return (
		<div className="flex justify-center my-4">
			<a href={`${baseUrl}/cv/dan-stoffels-cv.pdf`} download={`dan-stoffels-cv.pdf`}>
				Download CV
			</a>
		</div>
	);
};

export default DownloadBtn;

export type DownloadBtnProps = { baseUrl: string };
