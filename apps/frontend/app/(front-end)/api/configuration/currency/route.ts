import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@/lib/util/api';

const apiUrl =
	process.env.CURRENCY_API_URL || 'http://localhost:4000/api/v1/currencies';

// Add these types at the top of the file

interface CurrencyResponse {
	result: {
		code: string;
		name: string;
		historical_rate: number;
		symbol: string;
	}[];
}

class ApiError extends Error {
	constructor(
		public status: number,
		message: string,
		public details?: unknown
	) {
		super(message);
		this.name = 'ApiError';
	}
}

interface TransformedCurrencyData {
	code: string;
	name: string;
	exchange_rate: number;
	symbol: string;
	is_active: boolean;
}

const validateAuth = (request: NextRequest) => {
	const token = request.headers.get('Authorization')?.replace('Bearer ', '');
	const tenantId = request.headers.get('x-tenant-id');

	if (!token || !tenantId) {
		throw new ApiError(401, 'Authorization token or x-tenant-id is missing');
	}

	return { token, tenantId };
};

const transformCurrencyData = (
	data: CurrencyResponse,
	currencyCodes: string[]
): TransformedCurrencyData[] => {
	return data.result
		.filter((currency) => currencyCodes.includes(currency.code))
		.map((currency) => ({
			code: currency.code,
			name: currency.name,
			exchange_rate: Number(currency.historical_rate.toFixed(2)),
			symbol: currency.symbol,
			is_active: true,
		}));
};

const fetchCurrencyData = async (
	baseUrl: string,
	token: string,
	tenantId: string
): Promise<CurrencyResponse> => {
	const response = await fetch(
		`${baseUrl}/api/system/currency-api?base_currency=THB`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'x-tenant-id': tenantId,
				'Content-Type': 'application/json',
			},
		}
	);

	if (!response.ok) {
		throw new ApiError(response.status, 'Failed to fetch currency data');
	}

	return response.json();
};

interface CurrencyPayload {
	list: TransformedCurrencyData[];
}

const postCurrencyData = async (
	data: TransformedCurrencyData[],
	token: string,
	tenantId: string
): Promise<unknown> => {
	const payload: CurrencyPayload = {
		list: data,
	};

	console.log('Request URL:', `${API_URL}/v1/currencies/batch`);
	console.log('Request Headers:', {
		Authorization: 'Bearer [REDACTED]',
		'x-tenant-id': tenantId,
		'Content-Type': 'application/json',
	});
	console.log('Request Payload:', JSON.stringify(payload, null, 2));

	try {
		const response = await fetch(`${API_URL}/v1/currencies/batch`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'x-tenant-id': tenantId,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});

		const responseData = await response.json();

		console.log('Response Status:', response.status);
		console.log(
			'Response Headers:',
			Object.fromEntries(response.headers.entries())
		);
		console.log('Response Data:', JSON.stringify(responseData, null, 2));

		if (!response.ok) {
			const errorDetails = {
				status: response.status,
				statusText: response.statusText,
				headers: Object.fromEntries(response.headers.entries()),
				body: responseData,
				url: response.url,
			};

			console.error('API Error Details:', errorDetails);

			throw new ApiError(
				response.status,
				`Failed to post currency data: ${response.statusText}`,
				{
					error: responseData,
					requestPayload: payload,
					...errorDetails,
				}
			);
		}

		return responseData;
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		console.error('Unexpected error in postCurrencyData:', error);
		throw new ApiError(500, 'Unexpected error while posting currency data', {
			originalError: error instanceof Error ? error.message : 'Unknown error',
			requestPayload: payload,
		});
	}
};
export async function GET(request: NextRequest) {
	const token = request.headers.get('Authorization')?.replace('Bearer ', '');

	if (!token) {
		return NextResponse.json(
			{ error: 'Token or tenant ID is missing from the headers' },
			{ status: 400 }
		);
	}

	const { searchParams } = new URL(request.url);
	const search = searchParams.get('search') || '';

	const options = {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
			'x-tenant-id': 'DUMMY',
		},
	};

	const url = `${apiUrl}?search=${search}`;

	try {
		const response = await fetch(url, options);

		if (!response.ok) {
			return NextResponse.json(
				{ error: `Failed to fetch data: ${response.statusText}` },
				{ status: response.status }
			);
		}

		const data = await response.json();

		return NextResponse.json(data);
	} catch (error) {
		console.error('Fetch error:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch data from API' },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		// Validate authentication
		const { token, tenantId } = validateAuth(request);

		// Parse and validate request body
		const body = await request.json();
		const currencyCodes = body.data;

		if (!Array.isArray(currencyCodes) || currencyCodes.length === 0) {
			throw new ApiError(
				400,
				'Request body must contain a non-empty array of currency codes in the data property'
			);
		}

		// Fetch currency data
		const currencyData = await fetchCurrencyData(
			request.nextUrl.origin,
			token,
			tenantId
		);

		// Transform data
		const transformedCurrencies = transformCurrencyData(
			currencyData,
			currencyCodes
		);

		// Post transformed data
		const result = await postCurrencyData(
			transformedCurrencies,
			token,
			tenantId
		);
		return NextResponse.json({ success: true, data: result });
	} catch (error) {
		console.error('Currency creation error:', error);

		if (error instanceof ApiError) {
			// log รายละเอียดเพิ่มเติมสำหรับ debug
			console.error('API Error Details:', {
				status: error.status,
				message: error.message,
				details: error.details,
			});

			return NextResponse.json(
				{
					error: error.message,
					details: error.details,
				},
				{ status: error.status }
			);
		}

		// log รายละเอียดของ unexpected errors
		console.error('Unexpected Error Details:', {
			name: error instanceof Error ? error.name : 'Unknown',
			message: error instanceof Error ? error.message : 'Unknown error',
			stack: error instanceof Error ? error.stack : undefined,
		});

		return NextResponse.json(
			{
				error: 'Internal server error',
				message: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}
