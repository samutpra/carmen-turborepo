import { format } from 'date-fns';

export enum DateKey {
    DATE = 'date',
    INVOICE_DATE = 'invoiceDate'
}

export const dateKeys = [DateKey.DATE, DateKey.INVOICE_DATE];

export const formatDateCustom = (dateString:string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return '-';
    }
    return format(date, process.env.NEXT_PUBLIC_SHORT_DATE_FORMAT  || 'dd MMM yyyy');
};