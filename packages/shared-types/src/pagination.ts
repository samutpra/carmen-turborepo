
export interface ParamsType {
    page?: number;
    perpage?: number;
    search?: string;
}

export class APIError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'APIError';
    }
}

export type PaginationType = {
    page?: number | 0;
    pages?: number | 0;
    perPage?: number | 10;
    total?: number | 0;
}