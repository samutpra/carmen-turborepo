export interface UnitConversion {
    id: string;
    unitId: string;
    fromUnit: string;
    toUnit: string;
    unitName: string;

    conversionFactor: number;
    unitType: "INVENTORY" | "ORDER" | "RECIPE" | "COUNTING";
}

export interface ProductType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
    id: string;
    productCode: string;
    name: string;
    description: string;
    localDescription: string;
    categoryId: string;
    subCategoryId: string;
    itemGroupId: string;
    primaryInventoryUnitId: string;
    size: string;
    color: string;
    barcode: string;
    isActive: boolean;
    basePrice: number;
    currency: string;
    taxType: string;
    taxRate: number;
    standardCost: number;
    lastCost: number;
    priceDeviationLimit: number;
    quantityDeviationLimit: number;
    minStockLevel: number;
    maxStockLevel: number;
    isForSale: boolean;
    isIngredient: boolean;
    weight: number;
    dimensions: { length: number; width: number; height: number };
    shelfLife: number;
    storageInstructions: string;
    unitConversions: UnitConversion[];
    imagesUrl: string;
}

export const productList: ProductType[] = [
    {
        id: '1',
        productCode: 'PRD-001',
        name: 'Organic Jasmine Rice',
        description: 'Premium quality organic jasmine rice sourced from certified organic farms. Known for its fragrant aroma and soft, sticky texture when cooked.',
        localDescription: 'ข้าวหอมะลิอินทรีย์',
        categoryId: 'CAT-001',
        categoryName: 'Rice & Grains',
        subCategoryId: 'SCAT-001',
        subCategoryName: 'Rice',
        itemGroupId: 'GRP-001',
        itemGroupName: 'Organic Products',
        primaryInventoryUnitId: 'UNIT-001',
        primaryUnitName: 'EACH',
        size: '1',
        color: 'White',
        barcode: '8851234567890',
        isActive: true,
        basePrice: 35.50,
        currency: 'THB',
        taxType: 'VAT',
        taxRate: 7,
        standardCost: 28.40,
        lastCost: 29.75,
        priceDeviationLimit: 10,
        quantityDeviationLimit: 5,
        minStockLevel: 100,
        maxStockLevel: 1000,
        isForSale: true,
        isIngredient: true,
        weight: 1,
        dimensions: { length: 10, width: 15, height: 20 },
        shelfLife: 365,
        storageInstructions: 'Store in a cool, dry place away from direct sunlight',
        imagesUrl: '/images/products/jasmine-rice.jpg',
        unitConversions: [
            {
                id: 'CONV-001',
                unitId: 'UNIT-001',
                unitName: 'Kilogram',
                conversionFactor: 1,
                fromUnit: 'UNIT-001',
                toUnit: 'UNIT-001',
                unitType: 'INVENTORY'
            },
            {
                id: 'CONV-002',
                unitId: 'UNIT-002',
                unitName: 'Bag (5kg)',
                conversionFactor: 5,
                fromUnit: 'UNIT-002',
                toUnit: 'UNIT-001',
                unitType: 'ORDER'
            },
            {
                id: 'CONV-003',
                unitId: 'UNIT-003',
                unitName: 'Sack (25kg)',
                conversionFactor: 25,
                fromUnit: 'UNIT-003',
                toUnit: 'UNIT-001',
                unitType: 'ORDER'
            }
        ]
    },
    {
        id: '2',
        productCode: 'PRD-002',
        name: 'Palm Sugar',
        description: 'Traditional Thai palm sugar made from coconut palm sap. Natural sweetener with caramel notes.',
        localDescription: 'น้ำตาลมะพร้าว',
        categoryId: 'CAT-002',
        categoryName: 'Sweeteners',
        subCategoryId: 'SCAT-002',
        subCategoryName: 'Natural Sweeteners',
        itemGroupId: 'GRP-002',
        itemGroupName: 'Traditional Products',
        primaryInventoryUnitId: 'UNIT-004',
        primaryUnitName: 'KG',
        size: '500g',
        color: 'Brown',
        barcode: '8851234567891',
        isActive: true,
        basePrice: 85.00,
        currency: 'THB',
        taxType: 'VAT',
        taxRate: 7,
        standardCost: 65.00,
        lastCost: 68.50,
        priceDeviationLimit: 15,
        quantityDeviationLimit: 10,
        minStockLevel: 50,
        maxStockLevel: 500,
        isForSale: true,
        isIngredient: true,
        weight: 0.5,
        dimensions: { length: 8, width: 8, height: 10 },
        shelfLife: 180,
        storageInstructions: 'Keep in airtight container in cool, dry place',
        imagesUrl: '/images/products/palm-sugar.jpg',
        unitConversions: [
            {
                id: 'CONV-004',
                unitId: 'UNIT-004',
                unitName: 'Kilogram',
                conversionFactor: 1,
                fromUnit: 'UNIT-004',
                toUnit: 'UNIT-001',
                unitType: 'INVENTORY'
            },
            {
                id: 'CONV-005',
                unitId: 'UNIT-005',
                unitName: 'Pack (500g)',
                conversionFactor: 0.5,
                fromUnit: 'UNIT-005',
                toUnit: 'UNIT-004',
                unitType: 'ORDER'
            },
            {
                id: 'CONV-006',
                unitId: 'UNIT-006',
                unitName: 'Box (10kg)',
                conversionFactor: 10,
                fromUnit: 'UNIT-006',
                toUnit: 'UNIT-004',
                unitType: 'ORDER'
            }
        ]
    }
];


export const inventoryUnits = [
    { id: 'UNIT-001', name: 'Kilogram', code: 'KG' },
    { id: 'UNIT-002', name: 'Gram', code: 'G' },
    { id: 'UNIT-003', name: 'Liter', code: 'L' },
    { id: 'UNIT-004', name: 'Milliliter', code: 'ML' },
    { id: 'UNIT-005', name: 'Piece', code: 'PC' },
];

export const inventoryData = {
    totalStock: {
        onHand: 3300,
        onOrder: 500
    },
    locations: [
        {
            code: 'MK-001',
            name: 'Main Kitchen Storage',
            type: 'Primary',
            onHand: 1500,
            onOrder: 500,
            minimum: 1000,
            maximum: 3000,
            reorderPoint: 1200,
            parLevel: 2000
        },
        {
            code: 'DR-001',
            name: 'Dry Storage Room',
            type: 'Secondary',
            onHand: 1000,
            onOrder: 0,
            minimum: 800,
            maximum: 2000,
            reorderPoint: 1000,
            parLevel: 1500
        },
        {
            code: 'CS-001',
            name: 'Cold Storage',
            type: 'Cold Storage',
            onHand: 500,
            onOrder: 0,
            minimum: 300,
            maximum: 1000,
            reorderPoint: 400,
            parLevel: 800
        },
        {
            code: 'BQ-001',
            name: 'Banquet Kitchen',
            type: 'Kitchen',
            onHand: 200,
            onOrder: 0,
            minimum: 150,
            maximum: 500,
            reorderPoint: 200,
            parLevel: 400
        },
        {
            code: 'PB-001',
            name: 'Pool Bar',
            type: 'Bar',
            onHand: 100,
            onOrder: 0,
            minimum: 50,
            maximum: 200,
            reorderPoint: 75,
            parLevel: 150
        }
    ],
    aggregateSettings: {
        minimum: 2300,
        maximum: 6700,
        reorderPoint: 2875,
        parLevel: 4850
    }
};

export const productInfo = {
    code: 'RAW-COFE-001',
    name: 'Green Coffee Beans - Colombian Arabica',
    inventoryUnit: 'BAG',
    ingredientUnits: [
        {
            ingredientUnit: 'KG',
            factor: 60,
            description: 'Kilogram',
            isDefault: true,
            precision: 2,
            minQty: 0.5
        },
        {
            ingredientUnit: 'LB',
            factor: 132.277,
            description: 'Pound',
            isDefault: false,
            precision: 1,
            minQty: 1
        },
        {
            ingredientUnit: 'MT',
            factor: 0.06,
            description: 'Metric Ton',
            isDefault: false,
            precision: 3,
            minQty: 0.001
        }
    ]
};

// Keep only the IngredientUnit interface that we're using

export interface IngredientUnitType {
    ingredientUnit: string;
    factor: number;
    description: string;
    isDefault: boolean;
    precision: number;
    minQty: number;
}

export const productOrderUnit = {
    code: 'PRD001',
    name: 'Product A - Standard Grade',
    inventoryUnit: 'EACH',
    orderUnits: [
        {
            orderUnit: 'BOX',
            factor: 24,
            description: 'Standard Box',
            weight: 12.5,
            weightUnit: 'KG',
            dimensions: '40x30x20',
            barcode: '12345678',
            isDefault: true
        },
        {
            orderUnit: 'CASE',
            factor: 144,
            description: 'Full Case',
            weight: 75.0,
            weightUnit: 'KG',
            dimensions: '120x80x100',
            barcode: '87654321',
            isDefault: false
        },
        {
            orderUnit: 'PALLET',
            factor: 1728,
            description: 'Standard Pallet',
            weight: 900.0,
            weightUnit: 'KG',
            dimensions: '120x100x150',
            barcode: '11223344',
            isDefault: false
        }
    ]
};

export interface CountingUnit {
    countUnit: string;
    factor: number;
    description: string;
    isDefault: boolean;
    precision: number;
    minQty: number;
}

export const productStockCount = {
    code: 'RAW-COFE-001',
    name: 'Green Coffee Beans - Colombian Arabica',
    inventoryUnit: 'BAG',
    stockCountUnits: [
        {
            countUnit: 'PALLET',
            factor: 20,
            description: 'Standard Pallet',
            isDefault: true,
            precision: 0,
            minQty: 1
        },
        {
            countUnit: 'BAG',
            factor: 1,
            description: 'Single Bag',
            isDefault: false,
            precision: 0,
            minQty: 1
        },
        {
            countUnit: 'KG',
            factor: 0.0167,
            description: 'Kilogram',
            isDefault: false,
            precision: 2,
            minQty: 0.5
        }
    ]
};