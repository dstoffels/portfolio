import { fetchDoc } from '@/utils/firebaseActions';
import nexios from 'nexios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const info = await fetchDoc('professionalInfo');

	try {
		let response = await nexios.get(info.pdfDownloadURL);
		return new NextResponse(response.data, {
			status: response.status,
			headers: response.headers,
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json(error, { status: 500 });
	}
}
