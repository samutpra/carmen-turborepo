import { CategoryType, currencyType, deliveryPointType, storeLocationType, unitType } from "../type";


export const storeLocationData: storeLocationType[] = [
    { id: "1", storeCode: "101", storeName: "Admin office", departmentName: "Main", type: "Main", status: "Default", isActive: true },
    { id: "2", storeCode: "102", storeName: "Finance/Accounting", departmentName: "Main", type: "Main", status: "Default", isActive: true },
    { id: "3", storeCode: "104", storeName: "Engineering", departmentName: "Main", type: "Main", status: "Default", isActive: true },
    { id: "4", storeCode: "105", storeName: "Food and Beverage", departmentName: "Main", type: "Main", status: "Default", isActive: true },
    { id: "5", storeCode: "1051", storeName: "The Ficus Kitchen", departmentName: "Main", type: "Main", status: "Default", isActive: true },
    { id: "6", storeCode: "1052", storeName: "The Edge Kitchen", departmentName: "Main", type: "Main", status: "Default", isActive: true },
    { id: "7", storeCode: "1053", storeName: "The Ficus Bar", departmentName: "Main", type: "Main", status: "Default", isActive: true },
    { id: "8", storeCode: "1054", storeName: "The Edge bar", departmentName: "Main", type: "Main", status: "Default", isActive: true },
    { id: "9", storeCode: "1055", storeName: "Room Service", departmentName: "Main", type: "Main", status: "Default", isActive: true },
    { id: "10", storeCode: "106", storeName: "Front Office", departmentName: "Main", type: "Main", status: "Default", isActive: true },
    { id: "11", storeCode: "107", storeName: "House Keeping", departmentName: "Main", type: "Main", status: "Default", isActive: true },
    { id: "12", storeCode: "108", storeName: "Human Resources", departmentName: "Main", type: "Main", status: "Default", isActive: true },
    { id: "13", storeCode: "109", storeName: "Main Kitchen", departmentName: "Main", type: "Main", status: "Default", isActive: true },
    { id: "14", storeCode: "110", storeName: "Sales & Marketing", departmentName: "Main", type: "Main", status: "Default", isActive: true },
    { id: "15", storeCode: "112", storeName: "Staff Canteen", departmentName: "Main", type: "Main", status: "Default", isActive: true },
    { id: "16", storeCode: "1121", storeName: "Staff Supply", departmentName: "Main", type: "Main", status: "Default", isActive: true },
    { id: "17", storeCode: "113", storeName: "Spa", departmentName: "Main", type: "Main", status: "Default", isActive: true },
    { id: "18", storeCode: "114", storeName: "Adventur&Discovery", departmentName: "Main", type: "Main", status: "Default", isActive: true },
    { id: "19", storeCode: "115", storeName: "Coporate Office", departmentName: "Main", type: "Main", status: "Default", isActive: true },
    { id: "20", storeCode: "116", storeName: "Bakery", departmentName: "Main", type: "Main", status: "Default", isActive: true },
    { id: "21", storeCode: "117", storeName: "Steward", departmentName: "Main", type: "Main", status: "Default", isActive: true },
    { id: "22", storeCode: "403", storeName: "FOOD STORE", departmentName: "Main", type: "Main", status: "System", isActive: true },
    { id: "23", storeCode: "404", storeName: "BEVERAGE STORE", departmentName: "Main", type: "Main", status: "System", isActive: true },
    { id: "24", storeCode: "405", storeName: "GENERAL STORE", departmentName: "Main", type: "Main", status: "System", isActive: true },
    { id: "25", storeCode: "412", storeName: "BEVERAGE STORE (WINE)", departmentName: "Main", type: "Main", status: "System", isActive: true },
];


export const currencyData: currencyType[] = [
    { id: '1', code: 'AUD', description: 'Australia Dollar', isActive: true },
    { id: '2', code: 'EURO', description: 'Euro', isActive: true },
    { id: '3', code: 'GBP', description: 'British Pound', isActive: true },
    { id: '4', code: 'HKD', description: 'Hong Kong Dollar', isActive: true },
    { id: '5', code: 'INR', description: 'Indian Rupee', isActive: true },
    { id: '6', code: 'JPY', description: 'Japan Yen', isActive: true },
    { id: '7', code: 'MVR', description: 'Maldivian Rufiyaa', isActive: true },
    { id: '8', code: 'RMB', description: 'Chinese Yuan', isActive: true },
    { id: '9', code: 'SGD', description: 'Singapore Dollar', isActive: true },
    { id: '10', code: 'THB', description: 'Thai Baht', isActive: true },
    { id: '11', code: 'USD', description: 'US Dollar', isActive: true },
    { id: '12', code: 'VND', description: 'Vietnam Dong', isActive: true },
];


export const unitData: unitType[] = [
    { id: '1', code: 'AS', description: 'AS', isActive: true },
    { id: '2', code: 'BAG', description: 'BAG', isActive: true },
    { id: '3', code: 'BALL', description: 'BALL', isActive: true },
    { id: '4', code: 'BASIN', description: 'basin', isActive: true },
    { id: '5', code: 'BLOCK', description: 'BLOCK', isActive: true },
    { id: '6', code: 'BOOK', description: 'BOOK', isActive: true },
    { id: '7', code: 'BOX', description: 'BOX', isActive: true },
    { id: '8', code: 'BTL', description: 'BTL', isActive: true },
    { id: '9', code: 'BUNCH', description: 'BUNCH', isActive: true },
    { id: '10', code: 'CA', description: 'CA', isActive: true },
    { id: '11', code: 'CAN', description: 'CAN', isActive: true },
    { id: '12', code: 'CAPSULES', description: 'Capsules', isActive: true },
    { id: '13', code: 'CAR', description: 'CAR', isActive: true },
    { id: '14', code: 'CAR(7000LTR)', description: 'car(7000 ltr)', isActive: true },
    { id: '15', code: 'CASE', description: 'CASE', isActive: true },
    { id: '16', code: 'COTTON', description: 'COTTON', isActive: true },
    { id: '17', code: 'CRATE', description: 'Crate', isActive: true },
    { id: '18', code: 'CUBE', description: 'CUBE', isActive: true },
    { id: '19', code: 'CUBIC METER', description: 'CUBIC METER', isActive: true },
    { id: '20', code: 'CUP', description: 'CUP', isActive: true },
    { id: '21', code: 'DAYS', description: 'DAYS', isActive: true },
    { id: '22', code: 'DOZEN', description: 'DOZEN', isActive: true },
    { id: '23', code: 'DRUME', description: 'DRUME', isActive: true },
    { id: '24', code: 'EA', description: 'EA', isActive: true },
    { id: '25', code: 'FOOT', description: 'FOOT', isActive: true },
    { id: '26', code: 'FOOT2', description: 'FOOT2', isActive: true },
    { id: '27', code: 'GALLON', description: 'GALLON', isActive: true },
    { id: '28', code: 'GRAM', description: 'GRAM', isActive: true },
    { id: '29', code: 'GROUP', description: 'GROUP', isActive: true },
    { id: '30', code: 'HOLE', description: 'HOLE', isActive: true },
    { id: '31', code: 'HOLES', description: 'holes', isActive: true },
    { id: '32', code: 'INCH', description: 'INCH', isActive: true },
    { id: '33', code: 'JAR', description: 'JAR', isActive: true },
    { id: '34', code: 'JOB', description: 'JOB', isActive: true },
    { id: '35', code: 'KG', description: 'KG', isActive: true },
    { id: '36', code: 'LINE', description: 'LINE', isActive: true },
    { id: '37', code: 'LITERS', description: 'LITERS', isActive: true },
    { id: '38', code: 'LOT', description: 'LOT', isActive: true },
    { id: '39', code: 'LTR.', description: 'LTR.', isActive: true },
    { id: '40', code: 'M', description: 'M', isActive: true },
    { id: '41', code: 'M2', description: 'M2', isActive: true },
    { id: '42', code: 'MATRIC', description: 'MATRIC', isActive: true },
    { id: '43', code: 'METER', description: 'METER', isActive: true },
    { id: '44', code: 'MONTH', description: 'MONTH', isActive: true },
    { id: '45', code: 'MOTORCYCLE', description: 'MOTORCYCLE', isActive: true },
    { id: '46', code: 'PACK', description: 'PACK', isActive: true },
    { id: '47', code: 'PAD', description: 'Pad', isActive: true },
    { id: '48', code: 'PAIL', description: 'PAIL', isActive: true },
    { id: '49', code: 'PAIR', description: 'PAIR', isActive: true },
    { id: '50', code: 'PC', description: 'PC', isActive: true },
    { id: '51', code: 'PCS', description: 'PCS', isActive: true },
    { id: '52', code: 'PILL', description: 'PILL', isActive: true },
    { id: '53', code: 'POINTS', description: 'Points', isActive: true },
    { id: '54', code: 'POND', description: 'Pond', isActive: true },
    { id: '55', code: 'POT', description: 'POT', isActive: true },
    { id: '56', code: 'PUNNET', description: 'punnet', isActive: true },
    { id: '57', code: 'RACK', description: 'rack', isActive: true },
    { id: '58', code: 'REAM', description: 'REAM', isActive: true },
    { id: '59', code: 'ROLL', description: 'ROLL', isActive: true },
    { id: '60', code: 'ROOM', description: 'ROOM', isActive: true },
    { id: '61', code: 'SACK', description: 'SACK', isActive: true },
    { id: '62', code: 'SAMPLE', description: 'Sample', isActive: true },
    { id: '63', code: 'SET', description: 'SET', isActive: true },
    { id: '64', code: 'SHEET', description: 'SHEET', isActive: true },
    { id: '65', code: 'SQF', description: 'SQF', isActive: true },
    { id: '66', code: 'SQM', description: 'SQM', isActive: true },
    { id: '67', code: 'SQUARE METER', description: 'SQUARE METER', isActive: true },
    { id: '68', code: 'SQUARE METERS', description: 'SQUARE METERS', isActive: true },
    { id: '69', code: 'SQYD', description: 'Sqyd', isActive: true },
    { id: '70', code: 'TANK', description: 'TANK', isActive: true },
    { id: '71', code: 'TIME', description: 'time', isActive: true },
    { id: '72', code: 'TIN', description: 'TIN', isActive: true },
    { id: '73', code: 'TRAY', description: 'TRAY', isActive: true },
    { id: '74', code: 'TREE', description: 'tree', isActive: true },
    { id: '75', code: 'TRIP', description: 'TRIP', isActive: true },
    { id: '76', code: 'TRUCK', description: 'TRUCK', isActive: true },
    { id: '77', code: 'TUB', description: 'tub', isActive: true },
    { id: '78', code: 'TUBES', description: 'tubes', isActive: true },
    { id: '79', code: 'WASHER', description: 'Washer', isActive: true },
    { id: '80', code: 'WEEK', description: 'WEEK', isActive: true },
    { id: '81', code: 'YARD', description: 'YARD', isActive: true },
    { id: '82', code: 'YDS', description: 'YDS', isActive: true },
];

export const deliveryPointData: deliveryPointType[] = [
    { id: '1', code: 'M1', description: 'MAIN', isActive: true },
    { id: '2', code: 'S1', description: 'SUB', isActive: true },
];


export const categoryData: CategoryType = [
    {
        id: "cat1",
        category: "COMPUTER",
        subCategories: [
            {
                id: "subcat1",
                subCategory: "COMPUTER",
                itemGroups: [
                    {
                        id: "item1",
                        name: "COMPUTER"
                    }
                ]
            }
        ]
    },
    {
        id: "cat2",
        category: "MENU",
        subCategories: [
            {
                id: "subcat2",
                subCategory: "MENU",
                itemGroups: [
                    {
                        id: "item1",
                        name: "MENU"
                    }
                ]
            }
        ]
    },
    {
        id: "cat3",
        category: "DECORATION",
        subCategories: [
            {
                id: "subcat3",
                subCategory: "DECORATION",
                itemGroups: [
                    {
                        id: "item1",
                        name: "H/K DECORATION"
                    }
                ]
            }
        ]
    },
    {
        id: "cat4",
        category: "OTHERS",
        subCategories: [
            {
                id: "subcat4",
                subCategory: "OTHERS",
                itemGroups: [
                    {
                        id: "item1",
                        name: "LANDSCAPING & GARDEN"
                    },
                    {
                        id: "item2",
                        name: "LEISURE & SPORT"
                    },
                    {
                        id: "item3",
                        name: "OTHERS"
                    }
                ]
            }
        ]
    },
    {
        id: "cat5",
        category: "SPARE PART",
        subCategories: [
            {
                id: "subcat5",
                subCategory: "CPU",
                itemGroups: [
                    {
                        id: "item1",
                        name: "AMD"
                    },
                    {
                        id: "item2",
                        name: "INTEL"
                    },
                    {
                        id: "item3",
                        name: "Laptop"
                    }
                ]
            },
            {
                id: "subcat6",
                subCategory: "MB",
                itemGroups: [
                    {
                        id: "item1",
                        name: "ASUS"
                    },
                    {
                        id: "item2",
                        name: "MSI"
                    }
                ]
            },
            {
                id: "subcat7",
                subCategory: "MONITOR",
                itemGroups: [
                    {
                        id: "item1",
                        name: "Monitor"
                    }
                ]
            }
        ]
    }
];
