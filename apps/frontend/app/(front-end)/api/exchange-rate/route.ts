import { NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;


export async function GET() {
    try {

        const API_URL_RATES = `https://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`
        const API_URL_SYMBOLS = `https://api.exchangeratesapi.io/v1/symbols?access_key=${API_KEY}`

        const [ratesResponse, symbolsResponse] = await Promise.all([
            fetch(API_URL_RATES),
            fetch(API_URL_SYMBOLS),
        ]);

        const ratesData = await ratesResponse.json();
        const symbolsData = await symbolsResponse.json();

        const mappedData = Object.keys(ratesData.rates).reduce((acc, key) => {
            if (symbolsData.symbols[key]) {
                acc[key] = {
                    rate: ratesData.rates[key],
                    description: symbolsData.symbols[key],
                };
            }
            return acc;
        }, {} as Record<string, { rate: number; description: string }>);

        return NextResponse.json({ data: mappedData }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}
