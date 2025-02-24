import { GoodsReceiveNote, PrType } from '@/lib/types';
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

export const grnSortFields: FieldConfig<GoodsReceiveNote>[] = [
	{ key: GOOD_RECIEIVE_NOTE_FIELDS.DATE, label: 'Date' },
	{ key: GOOD_RECIEIVE_NOTE_FIELDS.REF, label: 'Code' },
	{ key: GOOD_RECIEIVE_NOTE_FIELDS.VENDOR, label: 'Vendor' },
	{ key: GOOD_RECIEIVE_NOTE_FIELDS.INVOICE_NUMBER, label: 'Invoice Number' },
	{ key: GOOD_RECIEIVE_NOTE_FIELDS.INVOICE_DATE, label: 'Invoice Date' },
	{ key: GOOD_RECIEIVE_NOTE_FIELDS.TOTAL_AMOUNT, label: 'Total Amount' },
	{ key: GOOD_RECIEIVE_NOTE_FIELDS.STATUS, label: 'Status', type: 'badge' },
];

export const goodsReceiveNoteFields: FieldConfig<GoodsReceiveNote>[] = [
	...grnSortFields,
	{ key: GOOD_RECIEIVE_NOTE_FIELDS.DESCRIPTION, label: 'Description' },
];

enum PrField {
	Id = 'id',
	Type = 'type',
	Description = 'description',
	Requestor = 'requestor',
	Department = 'department',
	Date = 'date',
	Status = 'status',
	Amount = 'amount',
	CurrentStage = 'currentStage',
}

export const prSortFields: FieldConfig<PrType>[] = [
	{ key: PrField.Type, label: 'Type' },
	{ key: PrField.Requestor, label: 'Requestor' },
	{ key: PrField.Department, label: 'Department' },
	{ key: PrField.Date, label: 'Date', type: 'date' },
	{ key: PrField.Status, label: 'Status', type: 'badge' },
	{ key: PrField.Amount, label: 'Amount', type: 'amount' },
	{ key: PrField.CurrentStage, label: 'Current Stage' },
];
