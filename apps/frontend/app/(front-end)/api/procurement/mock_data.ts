import {
	ActivityLogEntry,
	Attachment,
	ExtraCost,
	FinancialSummary,
	GoodsReceiveNoteItem,
	GoodsReceiveNoteStatus,
	StockMovement,
	Comment,
} from '@/lib/types';

export interface CreditNote {
	id: string;
	refNumber: string;
	description: string;
	vendorId: string;
	vendorName: string;
	createdDate: Date;
	docNumber: string;
	docDate: Date;
	netAmount: number;
	taxAmount: number;
	totalAmount: number;
	currency: string;
	status: string;
	notes: string;
	createdBy: string;
	updatedDate: Date;
	updatedBy: string;
	items: CreditNoteItem[];
	attachments: CreditNoteAttachment[];
}

export type CreditNoteStatus =
	| 'draft'
	| 'pending'
	| 'approved'
	| 'rejected'
	| 'void';

export type CreditNoteType = CreditNote;

export interface CreditNoteItem {
	id: string;
	description: string;
	quantity: number;
	unitPrice: number;
	discountPercentage: number;
	taxPercentage: number;
}

export interface CreditNoteAttachment {
	id: string;
	fileName: string;
	fileSize: number;
	uploadDate: Date;
	uploadedBy: string;
}

export interface EditedItem {
	id: string;
	productName: string;
	productDescription: string;
	location: string;
	lotNo: string;
	orderUnit: string;
	inventoryUnit: string;
	rcvQty: number;
	cnQty: number;
	unitPrice: number;
	cnAmt: number;
	costVariance: number;
	discountAmount: number;
	totalReceivedQty: number;
	grnNumber: string;
	grnDate: Date;
	taxRate: number;
	tax: number;
	total: number;
	appliedLots?: Array<{
		lotNumber: string;
		receiveDate: Date;
		grnNumber: string;
		invoiceNumber: string;
	}>;
}

export const staticCreditNotes: CreditNoteType[] = [
	{
		id: 'credit-note-1',
		refNumber: 'CN-001',
		description: 'Credit Note for Invoice INV-001',
		vendorName: 'Vendor A',
		status: 'Draft',
		createdDate: new Date('2023-10-01'),
		docNumber: 'DOC-001',
		docDate: new Date('2023-10-01'),
		netAmount: 1000,
		taxAmount: 100,
		totalAmount: 1100,
		vendorId: 'vendor-1',
		currency: 'USD',
		notes: 'This is a test credit note',
		createdBy: 'admin',
		updatedDate: new Date('2023-10-01'),
		updatedBy: 'admin',
		items: [],
		attachments: [],
	},
	{
		id: 'credit-note-2',
		refNumber: 'CN-002',
		description: 'Credit Note for Invoice INV-002',
		vendorName: 'Vendor B',
		status: 'Submitted',
		createdDate: new Date('2023-10-02'),
		docNumber: 'DOC-002',
		docDate: new Date('2023-10-02'),
		netAmount: 2000,
		taxAmount: 200,
		totalAmount: 2200,
		vendorId: 'vendor-2',
		currency: 'USD',
		notes: 'This is a test credit note',
		createdBy: 'admin',
		updatedDate: new Date('2023-10-02'),
		updatedBy: 'admin',
		items: [],
		attachments: [],
	},
	// Add more mock data entries here
	{
		id: 'credit-note-3',
		refNumber: 'CN-003',
		description: 'Credit Note for Invoice INV-003',
		vendorName: 'Vendor C',
		status: 'Approved',
		createdDate: new Date('2023-10-03'),
		docNumber: 'DOC-003',
		docDate: new Date('2023-10-03'),
		netAmount: 1500,
		taxAmount: 150,
		totalAmount: 1650,
		vendorId: 'vendor-3',
		currency: 'USD',
		notes: 'This is a test credit note',
		createdBy: 'admin',
		updatedDate: new Date('2023-10-03'),
		updatedBy: 'admin',
		items: [],
		attachments: [],
	},
	{
		id: 'credit-note-4',
		refNumber: 'CN-004',
		description: 'Credit Note for Invoice INV-004',
		vendorName: 'Vendor D',
		status: 'Rejected',
		createdDate: new Date('2023-10-04'),
		docNumber: 'DOC-004',
		docDate: new Date('2023-10-04'),
		netAmount: 2500,
		taxAmount: 250,
		totalAmount: 2750,
		vendorId: 'vendor-4',
		currency: 'USD',
		notes: 'This is a test credit note',
		createdBy: 'admin',
		updatedDate: new Date('2023-10-04'),
		updatedBy: 'admin',
		items: [],
		attachments: [],
	},
	{
		id: 'credit-note-5',
		refNumber: 'CN-005',
		description: 'Credit Note for Invoice INV-005',
		vendorName: 'Vendor E',
		status: 'Voided',
		createdDate: new Date('2023-10-05'),
		docNumber: 'DOC-005',
		docDate: new Date('2023-10-05'),
		netAmount: 3000,
		taxAmount: 300,
		totalAmount: 3300,
		vendorId: 'vendor-5',
		currency: 'USD',
		notes: 'This is a test credit note',
		createdBy: 'admin',
		updatedDate: new Date('2023-10-05'),
		updatedBy: 'admin',
		items: [],
		attachments: [],
	},
	// Continue adding more entries as needed
];

export interface GoodsReceiveNote {
	id: string;
	ref: string;
	date: Date;
	invoiceDate: Date;
	invoiceNumber: string;
	taxInvoiceDate?: Date;
	taxInvoiceNumber?: string;
	description: string;
	receiver: string;
	vendorId: string;
	vendor: string;
	location: string;
	currency: string;
	exchangeRate: number;
	baseCurrency: string;
	status: GoodsReceiveNoteStatus | string;
	isConsignment: boolean;
	isCash: boolean;
	cashBook?: string;
	items: GoodsReceiveNoteItem[];
	selectedItems: string[];
	stockMovements: StockMovement[];
	extraCosts: ExtraCost[];
	comments: Comment[];
	attachments: Attachment[];
	activityLog: ActivityLogEntry[];
	financialSummary?: FinancialSummary | null;
	baseSubTotalPrice: number;
	subTotalPrice: number;
	baseNetAmount: number;
	netAmount: number;
	baseDiscAmount: number;
	discountAmount: number;
	baseTaxAmount: number;
	taxAmount: number;
	baseTotalAmount: number;
	totalAmount: number;
	creditTerms?: string;
	dueDate?: Date;
}

export const mockGoodsReceiveNotes: GoodsReceiveNote[] = [
	{
		id: 'GRN006',
		ref: 'GRN-2023-006',
		date: new Date('2023-08-10'),
		selectedItems: [],
		invoiceDate: new Date('2023-08-09'),
		invoiceNumber: 'INV-20230809-006',
		taxInvoiceDate: new Date('2023-08-09'),
		taxInvoiceNumber: 'TAX-20230809-006',
		description: 'Kitchen Equipment Delivery',
		receiver: 'Alice Thompson',
		vendor: 'Professional Kitchen Supplies',
		vendorId: 'VENDOR-001',
		location: 'Kitchen Storage',
		currency: 'USD',
		status: 'Received',
		isConsignment: false,
		isCash: false,
		cashBook: 'General Cash Book',
		items: [
			{
				id: 'ITEM011',
				name: 'Commercial Blender',
				description: 'High-power, 3HP motor',
				jobCode: 'JOB-2023-006',
				orderedQuantity: 5,
				receivedQuantity: 5,
				unit: 'piece',
				unitPrice: 399.99,
				totalAmount: 1999.95,
				subTotalAmount: 1999.95,
				currency: 'USD',
				exchangeRate: 1,
				taxRate: 0.08,
				taxAmount: 160,
				discountRate: 0.1,
				discountAmount: 200,
				netAmount: 1959.95,
				baseQuantity: 5,
				baseUnitPrice: 399.99,
				baseUnit: 'piece',
				baseCurrency: 'USD',
				conversionRate: 1,
				baseSubTotalAmount: 1999.95,
				baseNetAmount: 1959.95,
				baseTotalAmount: 1999.95,
				baseTaxRate: 0.08,
				baseTaxAmount: 160,
				baseDiscountRate: 0.1,
				baseDiscountAmount: 200,
				extraCost: 50,
				inventoryOnHand: 5,
				inventoryOnOrder: 0,
				inventoryReorderThreshold: 2,
				inventoryRestockLevel: 1,
				purchaseOrderRef: 'PO-2023-006',
				lastPurchasePrice: 399.99,
				lastOrderDate: new Date('2023-08-10'),
				lastVendor: 'Professional Kitchen Supplies',
				lotNumber: 'LOT-2023-011',
				deliveryPoint: 'Kitchen Receiving',
				deliveryDate: new Date('2023-08-10'),
				location: 'Kitchen Storage',
				isFreeOfCharge: false,
				taxIncluded: false,
				adjustments: {
					discount: false,
					tax: false,
				},
			},
			{
				id: 'ITEM012',
				name: "Chef's Knives Set",
				description: 'Professional 8-piece set',
				jobCode: 'JOB-2023-006',
				orderedQuantity: 10,
				receivedQuantity: 10,
				unit: 'set',
				unitPrice: 249.99,
				totalAmount: 2499.9,
				subTotalAmount: 2499.9,
				currency: 'USD',
				exchangeRate: 1,
				taxRate: 0.08,
				taxAmount: 200,
				discountRate: 0.05,
				discountAmount: 125,
				netAmount: 2574.9,
				baseQuantity: 10,
				baseUnitPrice: 249.99,
				baseUnit: 'set',
				baseCurrency: 'USD',
				conversionRate: 1,
				baseSubTotalAmount: 2499.9,
				baseNetAmount: 2574.9,
				baseTotalAmount: 2499.9,
				baseTaxRate: 0.08,
				baseTaxAmount: 200,
				baseDiscountRate: 0.05,
				baseDiscountAmount: 125,
				extraCost: 25,
				inventoryOnHand: 10,
				inventoryOnOrder: 0,
				inventoryReorderThreshold: 3,
				inventoryRestockLevel: 2,
				purchaseOrderRef: 'PO-2023-006',
				lastPurchasePrice: 249.99,
				lastOrderDate: new Date('2023-08-10'),
				lastVendor: 'Professional Kitchen Supplies',
				lotNumber: 'LOT-2023-012',
				deliveryPoint: 'Kitchen Receiving',
				deliveryDate: new Date('2023-08-10'),
				location: 'Kitchen Storage',
				isFreeOfCharge: false,
				taxIncluded: false,
				adjustments: {
					discount: false,
					tax: false,
				},
			},
		],
		stockMovements: [
			{
				id: '3',
				itemName: 'Commercial Blender',
				quantity: 5,
				unit: 'piece',
				fromLocation: 'Kitchen Receiving',
				toLocation: 'Kitchen Storage',
				netAmount: 1249.95,
				extraCost: 50,
				totalAmount: 1299.95,
				cost: 249.99,
				totalCost: 1249.95,
				currency: 'USD',
				itemDescription: '',
				lotNumber: 1,
			},
			{
				id: '4',
				itemName: "Chef's Knives Set",
				quantity: 10,
				unit: 'set',
				fromLocation: 'Kitchen Receiving',
				toLocation: 'Kitchen Storage',
				netAmount: 2499.9,
				extraCost: 25,
				totalAmount: 2524.9,
				cost: 249.99,
				totalCost: 1249.95,
				currency: 'USD',
				itemDescription: '',
				lotNumber: 1,
			},
		],
		extraCosts: [
			{
				id: 'EC002',
				type: 'handling',
				amount: 75,
				currency: 'USD',
				exchangeRate: 1,
				baseAmount: 75,
				baseCurrency: 'USD',
			},
		],
		comments: [
			{
				id: 'COM002',
				text: 'All kitchen equipment received in excellent condition.',
				content: 'All kitchen equipment received in excellent condition.',
				timestamp: new Date('2023-08-10T14:45:00Z'),
				userName: 'Alice Thompson',
				userId: '102',
			},
		],
		attachments: [
			{
				id: 'ATT002',
				publicAccess: true,
				userId: '102',
				userName: 'Alice Thompson',
				fileName: 'Kitchen_Equipment_Invoice.pdf',
				fileType: 'application/pdf',
				fileSize: 2048,
				fileUrl: 'https://example.com/Kitchen_Equipment_Invoice.pdf',
				uploadDate: new Date('2023-08-10T15:00:00Z'),
			},
		],
		activityLog: [
			{
				id: 'LOG003',
				action: 'Created Goods Receive Note',
				userId: '102',
				userName: 'Alice Thompson',
				activityType: 'Document',
				description: 'Goods Receive Note created for kitchen equipment',
				timestamp: new Date('2023-08-10T14:30:00Z'),
			},
			{
				id: 'LOG004',
				action: 'Marked as Received',
				userId: '102',
				userName: 'Alice Thompson',
				activityType: 'Document',
				description: 'Kitchen equipment marked as received',
				timestamp: new Date('2023-08-10T15:15:00Z'),
			},
		],
		financialSummary: {
			id: 'FS002',
			netAmount: 4499.85,
			taxAmount: 360,
			totalAmount: 4859.85,
			currency: 'USD',
			baseNetAmount: 4499.85,
			baseTaxAmount: 360,
			baseTotalAmount: 4859.85,
			baseCurrency: 'USD',
			jvType: 'GRN',
			jvNumber: 'JV-2023-002',
			jvDate: new Date('2023-08-10'),
			jvDescription: 'Goods Receive Note - Kitchen Equipment',
			jvStatus: 'posted',
			jvReference: 'GRN-2023-006',
			jvDetail: [
				{
					department: { id: 'DEPT-001', name: 'Purchasing' },
					accountCode: { id: 'ACC-001', code: '1000', name: 'Inventory' },
					accountName: 'Inventory',
					currency: 'USD',
					debit: 4499.85,
					credit: 0,
					baseCurrency: 'USD',
					baseDebit: 4499.85,
					baseCredit: 0,
				},
				{
					department: { id: 'DEPT-002', name: 'Finance' },
					accountCode: {
						id: 'ACC-002',
						code: '2000',
						name: 'Accounts Payable',
					},
					accountName: 'Accounts Payable',
					currency: 'USD',
					debit: 0,
					credit: 4499.85,
					baseCurrency: 'USD',
					baseDebit: 0,
					baseCredit: 4499.85,
				},
				{
					department: { id: 'DEPT-002', name: 'Finance' },
					accountCode: { id: 'ACC-003', code: '2200', name: 'VAT Payable' },
					accountName: 'VAT Payable',
					currency: 'USD',
					debit: 0,
					credit: 360,
					baseCurrency: 'USD',
					baseDebit: 0,
					baseCredit: 360,
				},
				{
					department: { id: 'DEPT-003', name: 'Warehouse' },
					accountCode: { id: 'ACC-004', code: '5000', name: 'Freight In' },
					accountName: 'Freight In',
					currency: 'USD',
					debit: 360,
					credit: 0,
					baseCurrency: 'USD',
					baseDebit: 360,
					baseCredit: 0,
				},
			],
			jvTotal: {
				debit: 4859.85,
				credit: 4859.85,
				baseDebit: 4859.85,
				baseCredit: 4859.85,
				baseCurrency: 'USD',
			},
		},

		exchangeRate: 1,
		baseCurrency: 'USD',
		baseSubTotalPrice: 4499.85,
		subTotalPrice: 4499.85,
		baseNetAmount: 4499.85,
		netAmount: 4499.85,
		baseDiscAmount: 325,
		discountAmount: 325,
		baseTaxAmount: 360,
		taxAmount: 360,
		baseTotalAmount: 4859.85,
		totalAmount: 4859.85,
	},
	{
		id: 'GRN007',
		ref: 'GRN-2023-007',
		date: new Date('2023-08-15'),
		selectedItems: [],
		invoiceDate: new Date('2023-08-14'),
		invoiceNumber: 'INV-20230814-007',
		taxInvoiceDate: new Date('2023-08-14'),
		taxInvoiceNumber: 'TAX-20230814-007',
		description: 'Office Furniture Delivery',
		receiver: 'Bob Johnson',
		vendorId: 'VENDOR-001',
		vendor: 'Modern Office Solutions',
		location: 'Office Storage',
		currency: 'USD',
		status: 'Pending',
		isConsignment: false,
		isCash: true,
		cashBook: 'Petty Cash',
		items: [
			{
				id: 'ITEM013',
				name: 'Ergonomic Office Chair',
				description: 'Adjustable height and lumbar support',
				jobCode: 'JOB-2023-007',
				orderedQuantity: 20,
				receivedQuantity: 20,
				unit: 'piece',
				unitPrice: 199.99,
				totalAmount: 3999.8,
				subTotalAmount: 3999.8,
				currency: 'USD',
				exchangeRate: 1,
				taxRate: 0.08,
				taxAmount: 320,
				discountRate: 0.05,
				discountAmount: 200,
				netAmount: 4119.8,
				baseQuantity: 20,
				baseUnitPrice: 199.99,
				baseUnit: 'piece',
				baseCurrency: 'USD',
				conversionRate: 1,
				baseSubTotalAmount: 3999.8,
				baseNetAmount: 3999.8,
				baseTotalAmount: 3999.8,
				baseTaxRate: 0.08,
				baseTaxAmount: 320,
				baseDiscountRate: 0.05,
				baseDiscountAmount: 200,
				extraCost: 100,
				inventoryOnHand: 20,
				inventoryOnOrder: 0,
				inventoryReorderThreshold: 5,
				inventoryRestockLevel: 10,
				purchaseOrderRef: 'PO-2023-007',
				lastPurchasePrice: 199.99,
				lastOrderDate: new Date('2023-08-15'),
				lastVendor: 'Modern Office Solutions',
				lotNumber: 'LOT-2023-013',
				deliveryPoint: 'Office Receiving',
				deliveryDate: new Date('2023-08-15'),
				location: 'Office Storage',
				isFreeOfCharge: false,
				taxIncluded: false,
				adjustments: {
					discount: false,
					tax: false,
				},
			},
		],
		stockMovements: [
			{
				id: '5',
				itemName: 'Ergonomic Office Chair',
				unit: 'piece',
				quantity: 20,
				fromLocation: 'Office Receiving',
				toLocation: 'Office Storage',
				netAmount: 3999.8,
				extraCost: 100,
				totalAmount: 4099.8,
				cost: 199.99,
				totalCost: 3999.8,
				currency: 'USD',
				itemDescription: '',
				lotNumber: 1,
			},
		],
		extraCosts: [
			{
				id: 'EC003',
				type: 'handling',
				amount: 100,
				currency: 'USD',
				exchangeRate: 1,
				baseAmount: 100,
				baseCurrency: 'USD',
			},
		],
		comments: [
			{
				id: 'COM003',
				text: 'Chairs arrived, pending assembly and inspection.',
				content: 'Chairs arrived, pending assembly and inspection.',
				timestamp: new Date('2023-08-15T10:30:00Z'),
				userName: 'Bob Johnson',
				userId: '103',
			},
		],
		attachments: [
			{
				id: 'ATT003',
				publicAccess: true,
				userId: '103',
				userName: 'Bob Johnson',
				fileName: 'Office_Chairs_Delivery_Note.pdf',
				fileType: 'application/pdf',
				fileSize: 1024,
				fileUrl: 'https://example.com/Office_Chairs_Delivery_Note.pdf',
				uploadDate: new Date('2023-08-15T11:00:00Z'),
			},
		],
		activityLog: [
			{
				id: 'LOG005',
				action: 'Created Goods Receive Note',
				userId: '103',
				userName: 'Bob Johnson',
				activityType: 'Document',
				description: 'Goods Receive Note created for office chairs',
				timestamp: new Date('2023-08-15T10:15:00Z'),
			},
		],
		exchangeRate: 1,
		baseCurrency: 'USD',
		baseSubTotalPrice: 3999.8,
		subTotalPrice: 3999.8,
		baseNetAmount: 3999.8,
		netAmount: 3999.8,
		baseDiscAmount: 200,
		discountAmount: 200,
		baseTaxAmount: 320,
		taxAmount: 320,
		baseTotalAmount: 4319.8,
		totalAmount: 4319.8,
	},
	{
		id: 'GRN009',
		ref: 'GRN-2023-007',
		date: new Date('2023-08-15'),
		selectedItems: [],
		invoiceDate: new Date('2023-08-14'),
		invoiceNumber: 'INV-20230814-007',
		taxInvoiceDate: new Date('2023-08-14'),
		taxInvoiceNumber: 'TAX-20230814-007',
		description: 'Office Furniture Delivery',
		receiver: 'Bob Johnson',
		vendorId: 'VENDOR-005',
		vendor: 'Modern Office Solutions',
		location: 'Office Storage',
		currency: 'USD',
		status: 'Cancelled',
		isConsignment: false,
		isCash: true,
		cashBook: 'Petty Cash',
		items: [
			{
				id: 'ITEM013',
				name: 'Ergonomic Office Chair',
				description: 'Adjustable height and lumbar support',
				jobCode: 'JOB-2023-007',
				orderedQuantity: 20,
				receivedQuantity: 20,
				unit: 'piece',
				unitPrice: 199.99,
				totalAmount: 3999.8,
				subTotalAmount: 3999.8,
				currency: 'USD',
				exchangeRate: 1,
				taxRate: 0.08,
				taxAmount: 320,
				discountRate: 0.05,
				discountAmount: 200,
				netAmount: 4119.8,
				baseQuantity: 20,
				baseUnitPrice: 199.99,
				baseUnit: 'piece',
				baseCurrency: 'USD',
				conversionRate: 1,
				baseSubTotalAmount: 3999.8,
				baseNetAmount: 3999.8,
				baseTotalAmount: 3999.8,
				baseTaxRate: 0.08,
				baseTaxAmount: 320,
				baseDiscountRate: 0.05,
				baseDiscountAmount: 200,
				extraCost: 100,
				inventoryOnHand: 20,
				inventoryOnOrder: 0,
				inventoryReorderThreshold: 5,
				inventoryRestockLevel: 10,
				purchaseOrderRef: 'PO-2023-007',
				lastPurchasePrice: 199.99,
				lastOrderDate: new Date('2023-08-15'),
				lastVendor: 'Modern Office Solutions',
				lotNumber: 'LOT-2023-013',
				deliveryPoint: 'Office Receiving',
				deliveryDate: new Date('2023-08-15'),
				location: 'Office Storage',
				isFreeOfCharge: false,
				taxIncluded: false,
				adjustments: {
					discount: false,
					tax: false,
				},
			},
		],
		stockMovements: [
			{
				id: '5',
				itemName: 'Ergonomic Office Chair',
				unit: 'piece',
				quantity: 20,
				fromLocation: 'Office Receiving',
				toLocation: 'Office Storage',
				netAmount: 3999.8,
				extraCost: 100,
				totalAmount: 4099.8,
				cost: 199.99,
				totalCost: 3999.8,
				currency: 'USD',
				itemDescription: '',
				lotNumber: 1,
			},
		],
		extraCosts: [
			{
				id: 'EC003',
				type: 'handling',
				amount: 100,
				currency: 'USD',
				exchangeRate: 1,
				baseAmount: 100,
				baseCurrency: 'USD',
			},
		],
		comments: [
			{
				id: 'COM003',
				text: 'Chairs arrived, pending assembly and inspection.',
				content: 'Chairs arrived, pending assembly and inspection.',
				timestamp: new Date('2023-08-15T10:30:00Z'),
				userName: 'Bob Johnson',
				userId: '103',
			},
		],
		attachments: [
			{
				id: 'ATT003',
				publicAccess: true,
				userId: '103',
				userName: 'Bob Johnson',
				fileName: 'Office_Chairs_Delivery_Note.pdf',
				fileType: 'application/pdf',
				fileSize: 1024,
				fileUrl: 'https://example.com/Office_Chairs_Delivery_Note.pdf',
				uploadDate: new Date('2023-08-15T11:00:00Z'),
			},
		],
		activityLog: [
			{
				id: 'LOG005',
				action: 'Created Goods Receive Note',
				userId: '103',
				userName: 'Bob Johnson',
				activityType: 'Document',
				description: 'Goods Receive Note created for office chairs',
				timestamp: new Date('2023-08-15T10:15:00Z'),
			},
		],
		exchangeRate: 1,
		baseCurrency: 'USD',
		baseSubTotalPrice: 3999.8,
		subTotalPrice: 3999.8,
		baseNetAmount: 3999.8,
		netAmount: 3999.8,
		baseDiscAmount: 200,
		discountAmount: 200,
		baseTaxAmount: 320,
		taxAmount: 320,
		baseTotalAmount: 4319.8,
		totalAmount: 4319.8,
	},
];
