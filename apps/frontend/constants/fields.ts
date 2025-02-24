import { GoodsReceiveNote } from '@/lib/types';
import { FieldConfig } from '@/lib/util/uiConfig';

export enum GOOD_RECIEIVE_NOTE_FIELDS {
	DATE = 'date',
	REF = 'ref',
	DESCRIPTION = 'description',
	VENDOR = 'vendor',
	INVOICE_NUMBER = 'invoiceNumber',
	INVOICE_DATE = 'invoiceDate',
	TOTAL_AMOUNT = 'totalAmount',
	STATUS = 'status',
}

export const sortFields: FieldConfig<GoodsReceiveNote>[] = [
	{ key: GOOD_RECIEIVE_NOTE_FIELDS.DATE, label: 'Date' },
	{ key: GOOD_RECIEIVE_NOTE_FIELDS.REF, label: 'Code' },
	{ key: GOOD_RECIEIVE_NOTE_FIELDS.VENDOR, label: 'Vendor' },
	{ key: GOOD_RECIEIVE_NOTE_FIELDS.INVOICE_NUMBER, label: 'Invoice Number' },
	{ key: GOOD_RECIEIVE_NOTE_FIELDS.INVOICE_DATE, label: 'Invoice Date' },
	{ key: GOOD_RECIEIVE_NOTE_FIELDS.TOTAL_AMOUNT, label: 'Total Amount' },
	{ key: GOOD_RECIEIVE_NOTE_FIELDS.STATUS, label: 'Status', type: 'badge' },
];

export const goodsReceiveNoteFields: FieldConfig<GoodsReceiveNote>[] = [
	...sortFields,
	{ key: GOOD_RECIEIVE_NOTE_FIELDS.DESCRIPTION, label: 'Description' },
];
