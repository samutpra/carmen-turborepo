import { StoreLocationType } from "@/lib/types";
import { currencyType, deliveryPointType, unitType } from "../type";


export const storeLocationData: StoreLocationType[] = [
	{
		id: '1',
		storeCode: '101',
		storeName: 'Admin office',
		departmentName: 'Main',
		type: 'Main',
		status: 'Default',
		is_active: true,
	},
	{
		id: '2',
		storeCode: '102',
		storeName: 'Finance/Accounting',
		departmentName: 'Main',
		type: 'Main',
		status: 'Default',
		is_active: false,
	},
	{
		id: '3',
		storeCode: '104',
		storeName: 'Engineering',
		departmentName: 'Main',
		type: 'Main',
		status: 'Default',
		is_active: true,
	},
	{
		id: '4',
		storeCode: '105',
		storeName: 'Food and Beverage',
		departmentName: 'Main',
		type: 'Main',
		status: 'Default',
		is_active: true,
	},
	{
		id: '5',
		storeCode: '1051',
		storeName: 'The Ficus Kitchen',
		departmentName: 'Main',
		type: 'Main',
		status: 'Default',
		is_active: true,
	},
	{
		id: '6',
		storeCode: '1052',
		storeName: 'The Edge Kitchen',
		departmentName: 'Main',
		type: 'Main',
		status: 'Default',
		is_active: true,
	},
	{
		id: '7',
		storeCode: '1053',
		storeName: 'The Ficus Bar',
		departmentName: 'Main',
		type: 'Main',
		status: 'Default',
		is_active: true,
	},
	{
		id: '8',
		storeCode: '1054',
		storeName: 'The Edge bar',
		departmentName: 'Main',
		type: 'Main',
		status: 'Default',
		is_active: true,
	},
	{
		id: '9',
		storeCode: '1055',
		storeName: 'Room Service',
		departmentName: 'Main',
		type: 'Main',
		status: 'Default',
		is_active: true,
	},
	{
		id: '10',
		storeCode: '106',
		storeName: 'Front Office',
		departmentName: 'Main',
		type: 'Main',
		status: 'Default',
		is_active: true,
	},
	{
		id: '11',
		storeCode: '107',
		storeName: 'House Keeping',
		departmentName: 'Main',
		type: 'Main',
		status: 'Default',
		is_active: true,
	},
	{
		id: '12',
		storeCode: '108',
		storeName: 'Human Resources',
		departmentName: 'Main',
		type: 'Main',
		status: 'Default',
		is_active: true,
	},
	{
		id: '13',
		storeCode: '109',
		storeName: 'Main Kitchen',
		departmentName: 'Main',
		type: 'Main',
		status: 'Default',
		is_active: true,
	},
	{
		id: '14',
		storeCode: '110',
		storeName: 'Sales & Marketing',
		departmentName: 'Main',
		type: 'Main',
		status: 'Default',
		is_active: true,
	},
	{
		id: '15',
		storeCode: '112',
		storeName: 'Staff Canteen',
		departmentName: 'Main',
		type: 'Main',
		status: 'Default',
		is_active: true,
	},
	{
		id: '16',
		storeCode: '1121',
		storeName: 'Staff Supply',
		departmentName: 'Main',
		type: 'Main',
		status: 'Default',
		is_active: true,
	},
	{
		id: '17',
		storeCode: '113',
		storeName: 'Spa',
		departmentName: 'Main',
		type: 'Main',
		status: 'Default',
		is_active: true,
	},
	{
		id: '18',
		storeCode: '114',
		storeName: 'Adventur&Discovery',
		departmentName: 'Main',
		type: 'Main',
		status: 'Default',
		is_active: true,
	},
	{
		id: '19',
		storeCode: '115',
		storeName: 'Coporate Office',
		departmentName: 'Main',
		type: 'Main',
		status: 'Default',
		is_active: true,
	},
	{
		id: '20',
		storeCode: '116',
		storeName: 'Bakery',
		departmentName: 'Main',
		type: 'Main',
		status: 'Default',
		is_active: true,
	},
	{
		id: '21',
		storeCode: '117',
		storeName: 'Steward',
		departmentName: 'Main',
		type: 'Main',
		status: 'Default',
		is_active: true,
	},
	{
		id: '22',
		storeCode: '403',
		storeName: 'FOOD STORE',
		departmentName: 'Main',
		type: 'Main',
		status: 'System',
		is_active: true,
	},
	{
		id: '23',
		storeCode: '404',
		storeName: 'BEVERAGE STORE',
		departmentName: 'Main',
		type: 'Main',
		status: 'System',
		is_active: true,
	},
	{
		id: '24',
		storeCode: '405',
		storeName: 'GENERAL STORE',
		departmentName: 'Main',
		type: 'Main',
		status: 'System',
		is_active: true,
	},
	{
		id: '25',
		storeCode: '412',
		storeName: 'BEVERAGE STORE (WINE)',
		departmentName: 'Main',
		type: 'Main',
		status: 'System',
		is_active: true,
	},
];

export const currencyData: currencyType[] = [
	{ id: '1', code: 'AUD', description: 'Australia Dollar', is_active: true },
	{ id: '2', code: 'EURO', description: 'Euro', is_active: true },
	{ id: '3', code: 'GBP', description: 'British Pound', is_active: true },
	{ id: '4', code: 'HKD', description: 'Hong Kong Dollar', is_active: true },
	{ id: '5', code: 'INR', description: 'Indian Rupee', is_active: true },
	{ id: '6', code: 'JPY', description: 'Japan Yen', is_active: true },
	{ id: '7', code: 'MVR', description: 'Maldivian Rufiyaa', is_active: true },
	{ id: '8', code: 'RMB', description: 'Chinese Yuan', is_active: true },
	{ id: '9', code: 'SGD', description: 'Singapore Dollar', is_active: true },
	{ id: '10', code: 'THB', description: 'Thai Baht', is_active: true },
	{ id: '11', code: 'USD', description: 'US Dollar', is_active: true },
	{ id: '12', code: 'VND', description: 'Vietnam Dong', is_active: true },
];

export const unitData: unitType[] = [
	{ id: '1', name: 'AS', description: 'AS', is_active: true },
	{ id: '2', name: 'BAG', description: 'BAG', is_active: true },
	{ id: '3', name: 'BALL', description: 'BALL', is_active: true },
	{ id: '4', name: 'BASIN', description: 'basin', is_active: true },
	{ id: '5', name: 'BLOCK', description: 'BLOCK', is_active: true },
	{ id: '6', name: 'BOOK', description: 'BOOK', is_active: true },
	{ id: '7', name: 'BOX', description: 'BOX', is_active: true },
	{ id: '8', name: 'BTL', description: 'BTL', is_active: true },
	{ id: '9', name: 'BUNCH', description: 'BUNCH', is_active: true },
	{ id: '10', name: 'CA', description: 'CA', is_active: true },
	{ id: '11', name: 'CAN', description: 'CAN', is_active: true },
	{ id: '12', name: 'CAPSULES', description: 'Capsules', is_active: true },
	{ id: '13', name: 'CAR', description: 'CAR', is_active: true },
	{
		id: '14',
		name: 'CAR(7000LTR)',
		description: 'car(7000 ltr)',
		is_active: true,
	},
	{ id: '15', name: 'CASE', description: 'CASE', is_active: true },
	{ id: '16', name: 'COTTON', description: 'COTTON', is_active: true },
	{ id: '17', name: 'CRATE', description: 'Crate', is_active: true },
	{ id: '18', name: 'CUBE', description: 'CUBE', is_active: true },
	{
		id: '19',
		name: 'CUBIC METER',
		description: 'CUBIC METER',
		is_active: true,
	},
	{ id: '20', name: 'CUP', description: 'CUP', is_active: true },
	{ id: '21', name: 'DAYS', description: 'DAYS', is_active: true },
	{ id: '22', name: 'DOZEN', description: 'DOZEN', is_active: true },
	{ id: '23', name: 'DRUME', description: 'DRUME', is_active: true },
	{ id: '24', name: 'EA', description: 'EA', is_active: true },
	{ id: '25', name: 'FOOT', description: 'FOOT', is_active: true },
	{ id: '26', name: 'FOOT2', description: 'FOOT2', is_active: true },
	{ id: '27', name: 'GALLON', description: 'GALLON', is_active: true },
	{ id: '28', name: 'GRAM', description: 'GRAM', is_active: true },
	{ id: '29', name: 'GROUP', description: 'GROUP', is_active: true },
	{ id: '30', name: 'HOLE', description: 'HOLE', is_active: true },
	{ id: '31', name: 'HOLES', description: 'holes', is_active: true },
	{ id: '32', name: 'INCH', description: 'INCH', is_active: true },
	{ id: '33', name: 'JAR', description: 'JAR', is_active: true },
	{ id: '34', name: 'JOB', description: 'JOB', is_active: true },
	{ id: '35', name: 'KG', description: 'KG', is_active: true },
	{ id: '36', name: 'LINE', description: 'LINE', is_active: true },
	{ id: '37', name: 'LITERS', description: 'LITERS', is_active: true },
	{ id: '38', name: 'LOT', description: 'LOT', is_active: true },
	{ id: '39', name: 'LTR.', description: 'LTR.', is_active: true },
	{ id: '40', name: 'M', description: 'M', is_active: true },
	{ id: '41', name: 'M2', description: 'M2', is_active: true },
	{ id: '42', name: 'MATRIC', description: 'MATRIC', is_active: true },
	{ id: '43', name: 'METER', description: 'METER', is_active: true },
	{ id: '44', name: 'MONTH', description: 'MONTH', is_active: true },
	{ id: '45', name: 'MOTORCYCLE', description: 'MOTORCYCLE', is_active: true },
	{ id: '46', name: 'PACK', description: 'PACK', is_active: true },
	{ id: '47', name: 'PAD', description: 'Pad', is_active: true },
	{ id: '48', name: 'PAIL', description: 'PAIL', is_active: true },
	{ id: '49', name: 'PAIR', description: 'PAIR', is_active: true },
	{ id: '50', name: 'PC', description: 'PC', is_active: true },
	{ id: '51', name: 'PCS', description: 'PCS', is_active: true },
	{ id: '52', name: 'PILL', description: 'PILL', is_active: true },
	{ id: '53', name: 'POINTS', description: 'Points', is_active: true },
	{ id: '54', name: 'POND', description: 'Pond', is_active: true },
	{ id: '55', name: 'POT', description: 'POT', is_active: true },
	{ id: '56', name: 'PUNNET', description: 'punnet', is_active: true },
	{ id: '57', name: 'RACK', description: 'rack', is_active: true },
	{ id: '58', name: 'REAM', description: 'REAM', is_active: true },
	{ id: '59', name: 'ROLL', description: 'ROLL', is_active: true },
	{ id: '60', name: 'ROOM', description: 'ROOM', is_active: true },
	{ id: '61', name: 'SACK', description: 'SACK', is_active: true },
	{ id: '62', name: 'SAMPLE', description: 'Sample', is_active: true },
	{ id: '63', name: 'SET', description: 'SET', is_active: true },
	{ id: '64', name: 'SHEET', description: 'SHEET', is_active: true },
	{ id: '65', name: 'SQF', description: 'SQF', is_active: true },
	{ id: '66', name: 'SQM', description: 'SQM', is_active: true },
	{
		id: '67',
		name: 'SQUARE METER',
		description: 'SQUARE METER',
		is_active: true,
	},
	{
		id: '68',
		name: 'SQUARE METERS',
		description: 'SQUARE METERS',
		is_active: true,
	},
	{ id: '69', name: 'SQYD', description: 'Sqyd', is_active: true },
	{ id: '70', name: 'TANK', description: 'TANK', is_active: true },
	{ id: '71', name: 'TIME', description: 'time', is_active: true },
	{ id: '72', name: 'TIN', description: 'TIN', is_active: true },
	{ id: '73', name: 'TRAY', description: 'TRAY', is_active: true },
	{ id: '74', name: 'TREE', description: 'tree', is_active: true },
	{ id: '75', name: 'TRIP', description: 'TRIP', is_active: true },
	{ id: '76', name: 'TRUCK', description: 'TRUCK', is_active: true },
	{ id: '77', name: 'TUB', description: 'tub', is_active: true },
	{ id: '78', name: 'TUBES', description: 'tubes', is_active: true },
	{ id: '79', name: 'WASHER', description: 'Washer', is_active: true },
	{ id: '80', name: 'WEEK', description: 'WEEK', is_active: true },
	{ id: '81', name: 'YARD', description: 'YARD', is_active: true },
	{ id: '82', name: 'YDS', description: 'YDS', is_active: true },
];

export const deliveryPointData: deliveryPointType[] = [
	{ id: '1', code: 'M1', description: 'MAIN', is_active: true },
	{ id: '2', code: 'S1', description: 'SUB', is_active: true },
];


// export const categoryData: CategoryType = [
//     {
//         id: "cat1",
//         category: "COMPUTER",
//         subCategories: [
//             {
//                 id: "subcat1",
//                 categoryId: "cat1",
//                 subCategory: "COMPUTER",
//                 itemGroups: [
//                     {
//                         id: "item1",
//                         subCategoryId: "subCat1",
//                         name: "COMPUTER"
//                     }
//                 ]
//             }
//         ]
//     },



//     {
//         id: "cat2",
//         category: "MENU",
//         subCategories: [
//             {
//                 id: "subcat2",
//                 subCategory: "MENU",
//                 itemGroups: [
//                     {
//                         id: "item1",
//                         name: "MENU"
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         id: "cat3",
//         category: "DECORATION",
//         subCategories: [
//             {
//                 id: "subcat3",
//                 subCategory: "DECORATION",
//                 itemGroups: [
//                     {
//                         id: "item1",
//                         name: "H/K DECORATION"
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         id: "cat4",
//         category: "OTHERS",
//         subCategories: [
//             {
//                 id: "subcat4",
//                 subCategory: "OTHERS",
//                 itemGroups: [
//                     {
//                         id: "item1",
//                         name: "LANDSCAPING & GARDEN"
//                     },
//                     {
//                         id: "item2",
//                         name: "LEISURE & SPORT"
//                     },
//                     {
//                         id: "item3",
//                         name: "OTHERS"
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         id: "cat5",
//         category: "SPARE PART",
//         subCategories: [
//             {
//                 id: "subcat5",
//                 subCategory: "CPU",
//                 itemGroups: [
//                     {
//                         id: "item1",
//                         name: "AMD"
//                     },
//                     {
//                         id: "item2",
//                         name: "INTEL"
//                     },
//                     {
//                         id: "item3",
//                         name: "Laptop"
//                     }
//                 ]
//             },
//             {
//                 id: "subcat6",
//                 subCategory: "MB",
//                 itemGroups: [
//                     {
//                         id: "item1",
//                         name: "ASUS"
//                     },
//                     {
//                         id: "item2",
//                         name: "MSI"
//                     }
//                 ]
//             },
//             {
//                 id: "subcat7",
//                 subCategory: "MONITOR",
//                 itemGroups: [
//                     {
//                         id: "item1",
//                         name: "Monitor"
//                     }
//                 ]
//             }
//         ]
//     }
// ];
