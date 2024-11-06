import { format } from 'date-fns';

export enum TypeDateKey {
    DATE = 'date',
    INVOICE_DATE = 'invoiceDate',
    ORDER_DATE = 'orderDate',
    DELI_DATE = 'deliveryDate'
}   

export const dateKeys = [
    TypeDateKey.DATE, 
    TypeDateKey.INVOICE_DATE,
    TypeDateKey.ORDER_DATE,
    TypeDateKey.DELI_DATE
];

export const formatDateCustom = (dateString:string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return '-';
    }
    return format(date, process.env.NEXT_PUBLIC_SHORT_DATE_FORMAT  || 'dd MMM yyyy');
};