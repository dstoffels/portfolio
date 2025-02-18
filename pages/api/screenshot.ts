import { nexios } from '@/utils/nexios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (!req.query.url) return res.status(400).json({ error: 'Required query param: url' });

	const { url } = req.query;

	try {
		const response = await nexios.get<any>(
			`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&screenshot=true`,
			{ timeout: 30000 },
		);

		const base64Img = response.data?.lighthouseResult?.audits['final-screenshot']?.details?.data;

		if (!base64Img) return res.status(400).json({ error: `No screenshot generated from ${url}` });

		return res.status(200).json({ base64Img });
	} catch (error) {
		return res.status((error as any).status).json(error);
	}
}
