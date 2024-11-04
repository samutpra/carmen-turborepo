import { StoreLocationType } from "@/lib/types";
import { CategoryType, currencyType, deliveryPointType, unitType } from "../type";


export const storeLocationData: StoreLocationType[] = [
    { id: "1", storeCode: "101", storeName: "Admin office", departmentName: "Main", type: "Main", status: "Default", isActive: true },
    { id: "2", storeCode: "102", storeName: "Finance/Accounting", departmentName: "Main", type: "Main", status: "Default", isActive: false },
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
    { id: '1', name: 'AS', description: 'AS', isActive: true },
    { id: '2', name: 'BAG', description: 'BAG', isActive: true },
    { id: '3', name: 'BALL', description: 'BALL', isActive: true },
    { id: '4', name: 'BASIN', description: 'basin', isActive: true },
    { id: '5', name: 'BLOCK', description: 'BLOCK', isActive: true },
    { id: '6', name: 'BOOK', description: 'BOOK', isActive: true },
    { id: '7', name: 'BOX', description: 'BOX', isActive: true },
    { id: '8', name: 'BTL', description: 'BTL', isActive: true },
    { id: '9', name: 'BUNCH', description: 'BUNCH', isActive: true },
    { id: '10', name: 'CA', description: 'CA', isActive: true },
    { id: '11', name: 'CAN', description: 'CAN', isActive: true },
    { id: '12', name: 'CAPSULES', description: 'Capsules', isActive: true },
    { id: '13', name: 'CAR', description: 'CAR', isActive: true },
    { id: '14', name: 'CAR(7000LTR)', description: 'car(7000 ltr)', isActive: true },
    { id: '15', name: 'CASE', description: 'CASE', isActive: true },
    { id: '16', name: 'COTTON', description: 'COTTON', isActive: true },
    { id: '17', name: 'CRATE', description: 'Crate', isActive: true },
    { id: '18', name: 'CUBE', description: 'CUBE', isActive: true },
    { id: '19', name: 'CUBIC METER', description: 'CUBIC METER', isActive: true },
    { id: '20', name: 'CUP', description: 'CUP', isActive: true },
    { id: '21', name: 'DAYS', description: 'DAYS', isActive: true },
    { id: '22', name: 'DOZEN', description: 'DOZEN', isActive: true },
    { id: '23', name: 'DRUME', description: 'DRUME', isActive: true },
    { id: '24', name: 'EA', description: 'EA', isActive: true },
    { id: '25', name: 'FOOT', description: 'FOOT', isActive: true },
    { id: '26', name: 'FOOT2', description: 'FOOT2', isActive: true },
    { id: '27', name: 'GALLON', description: 'GALLON', isActive: true },
    { id: '28', name: 'GRAM', description: 'GRAM', isActive: true },
    { id: '29', name: 'GROUP', description: 'GROUP', isActive: true },
    { id: '30', name: 'HOLE', description: 'HOLE', isActive: true },
    { id: '31', name: 'HOLES', description: 'holes', isActive: true },
    { id: '32', name: 'INCH', description: 'INCH', isActive: true },
    { id: '33', name: 'JAR', description: 'JAR', isActive: true },
    { id: '34', name: 'JOB', description: 'JOB', isActive: true },
    { id: '35', name: 'KG', description: 'KG', isActive: true },
    { id: '36', name: 'LINE', description: 'LINE', isActive: true },
    { id: '37', name: 'LITERS', description: 'LITERS', isActive: true },
    { id: '38', name: 'LOT', description: 'LOT', isActive: true },
    { id: '39', name: 'LTR.', description: 'LTR.', isActive: true },
    { id: '40', name: 'M', description: 'M', isActive: true },
    { id: '41', name: 'M2', description: 'M2', isActive: true },
    { id: '42', name: 'MATRIC', description: 'MATRIC', isActive: true },
    { id: '43', name: 'METER', description: 'METER', isActive: true },
    { id: '44', name: 'MONTH', description: 'MONTH', isActive: true },
    { id: '45', name: 'MOTORCYCLE', description: 'MOTORCYCLE', isActive: true },
    { id: '46', name: 'PACK', description: 'PACK', isActive: true },
    { id: '47', name: 'PAD', description: 'Pad', isActive: true },
    { id: '48', name: 'PAIL', description: 'PAIL', isActive: true },
    { id: '49', name: 'PAIR', description: 'PAIR', isActive: true },
    { id: '50', name: 'PC', description: 'PC', isActive: true },
    { id: '51', name: 'PCS', description: 'PCS', isActive: true },
    { id: '52', name: 'PILL', description: 'PILL', isActive: true },
    { id: '53', name: 'POINTS', description: 'Points', isActive: true },
    { id: '54', name: 'POND', description: 'Pond', isActive: true },
    { id: '55', name: 'POT', description: 'POT', isActive: true },
    { id: '56', name: 'PUNNET', description: 'punnet', isActive: true },
    { id: '57', name: 'RACK', description: 'rack', isActive: true },
    { id: '58', name: 'REAM', description: 'REAM', isActive: true },
    { id: '59', name: 'ROLL', description: 'ROLL', isActive: true },
    { id: '60', name: 'ROOM', description: 'ROOM', isActive: true },
    { id: '61', name: 'SACK', description: 'SACK', isActive: true },
    { id: '62', name: 'SAMPLE', description: 'Sample', isActive: true },
    { id: '63', name: 'SET', description: 'SET', isActive: true },
    { id: '64', name: 'SHEET', description: 'SHEET', isActive: true },
    { id: '65', name: 'SQF', description: 'SQF', isActive: true },
    { id: '66', name: 'SQM', description: 'SQM', isActive: true },
    { id: '67', name: 'SQUARE METER', description: 'SQUARE METER', isActive: true },
    { id: '68', name: 'SQUARE METERS', description: 'SQUARE METERS', isActive: true },
    { id: '69', name: 'SQYD', description: 'Sqyd', isActive: true },
    { id: '70', name: 'TANK', description: 'TANK', isActive: true },
    { id: '71', name: 'TIME', description: 'time', isActive: true },
    { id: '72', name: 'TIN', description: 'TIN', isActive: true },
    { id: '73', name: 'TRAY', description: 'TRAY', isActive: true },
    { id: '74', name: 'TREE', description: 'tree', isActive: true },
    { id: '75', name: 'TRIP', description: 'TRIP', isActive: true },
    { id: '76', name: 'TRUCK', description: 'TRUCK', isActive: true },
    { id: '77', name: 'TUB', description: 'tub', isActive: true },
    { id: '78', name: 'TUBES', description: 'tubes', isActive: true },
    { id: '79', name: 'WASHER', description: 'Washer', isActive: true },
    { id: '80', name: 'WEEK', description: 'WEEK', isActive: true },
    { id: '81', name: 'YARD', description: 'YARD', isActive: true },
    { id: '82', name: 'YDS', description: 'YDS', isActive: true },
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
                categoryId: "cat1",
                subCategory: "COMPUTER",
                itemGroups: [
                    {
                        id: "item1",
                        subCategoryId: "subCat1",
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
