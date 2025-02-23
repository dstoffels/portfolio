import P from '@/components/P';
import { CertType } from '../../types';

const Cert = ({ cert }: CertProps) => {
	const year = new Date(cert.date).getFullYear();
	return (
		<div>
			<h3 className="text-orange-500 font-semibold">{cert.name}</h3>
			{/* <div className="flex justify-between">
				<P className="font-semibold mb-2">{cert.institution}</P>
				<P>{year}</P>
			</div> */}
			<P>{cert.description}</P>
		</div>
	);
};

export default Cert;

export type CertProps = {
	cert: CertType;
};
