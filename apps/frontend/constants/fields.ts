import { UnitCreateModel } from '@/dtos/unit.dto';
import { VendorCreateModel } from '@/dtos/vendor.dto';
import { GoodsReceiveNote, PrType, PurchaseOrderType } from '@/lib/types';
import { FieldConfig } from '@/lib/util/uiConfig';
import * as m from '@/paraglide/messages.js';

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

const enum PrField {
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
export const enum PoField {
	Id = 'poId',
	Number = 'number',
	VendorId = 'vendorId',
	VendorName = 'vendorName',
	OrderDate = 'orderDate',
	DeliveryDate = 'deliveryDate',
	Status = 'status',
	CurrencyCode = 'currencyCode',
	BaseCurrencyCode = 'baseCurrencyCode',
	ExchangeRate = 'exchangeRate',
	Notes = 'notes',
	CreatedBy = 'createdBy',
	ApprovedBy = 'approvedBy',
	ApprovalDate = 'approvalDate',
	Email = 'email',
	Buyer = 'buyer',
	CreditTerms = 'creditTerms',
	Description = 'description',
	Remarks = 'remarks',
	BaseSubTotalPrice = 'baseSubTotalPrice',
	SubTotalPrice = 'subTotalPrice',
	BaseNetAmount = 'baseNetAmount',
	NetAmount = 'netAmount',
	BaseDiscAmount = 'baseDiscAmount',
	DiscountAmount = 'discountAmount',
	BaseTaxAmount = 'baseTaxAmount',
	TaxAmount = 'taxAmount',
	BaseTotalAmount = 'baseTotalAmount',
	TotalAmount = 'totalAmount',
}

export const poSortFields: FieldConfig<PurchaseOrderType>[] = [
	{ key: PoField.Number, label: 'Number' },
	{ key: PoField.VendorName, label: 'Vendor Name' },
	{ key: PoField.OrderDate, label: 'Order Date', type: 'date' },
	{ key: PoField.DeliveryDate, label: 'Delivery Date', type: 'date' },
	{ key: PoField.Status, label: 'Status', type: 'badge' },
	{ key: PoField.TotalAmount, label: 'Total Amount', type: 'amount' },
	{ key: PoField.CurrencyCode, label: 'Currency' },
	{ key: PoField.ExchangeRate, label: 'Exchange Rate', type: 'decimal' },
	{ key: PoField.BaseCurrencyCode, label: 'Base Currency' },
	{ key: PoField.ApprovalDate, label: 'Approval Date', type: 'date' },
];

export const enum UnitField {
	Name = 'name',
	Description = 'description',
	Status = 'is_active',
}

export const unitSortFields: FieldConfig<UnitCreateModel>[] = [
	{
		key: UnitField.Name,
		label: `${m.unit_name_label()}`,
		className: 'w-24',
	},
];

export const unitFields: FieldConfig<UnitCreateModel>[] = [
	...unitSortFields,
	{
		key: UnitField.Status,
		label: `${m.status_text()}`,
		type: 'badge',
		className: 'w-24',
	},
	{
		key: UnitField.Description,
		label: `${m.unit_des_label()}`,
	},
];

export const enum VendorFields {
	Name = 'name',
	Description = 'description',
	IsActive = 'is_active',
}

export const vendorSortFields: FieldConfig<VendorCreateModel>[] = [
	{
		key: VendorFields.Name,
		label: m.vendor_name_label(),
	},
	{
		key: VendorFields.Description,
		label: m.description(),
	},
	{
		key: VendorFields.IsActive,
		label: m.status_text(),
	},
];