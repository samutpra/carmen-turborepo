'use server'

interface Rate {
    rate: number;
    description: string;
}

export interface ExchangeRateData {
    [currency: string]: Rate;
}

interface APIResponse {
    data: ExchangeRateData;
    error?: string;
}

export const fetchExchangeRate = async (): Promise<ExchangeRateData> => {
    // Use environment variable for the API URL
    const url = `http://localhost:3500/api/exchange-rate`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: { revalidate: 3600 }, // Revalidate every hour
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch exchange rate: ${response.statusText}`);
        }

        const result: APIResponse = await response.json();

        if (result.error) {
            throw new Error(result.error);
        }

        return result.data; // Return the data property from the response
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        throw error;
    }
};