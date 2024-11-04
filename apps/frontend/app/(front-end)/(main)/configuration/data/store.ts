export const categoryData = [
    {
        id: "cat_1",
        categoryName: "FOOD",
    },
    {
        id: "cat_2",
        categoryName: "BEVERAGE",
    }
]

export const subCategoryData = [
    {
        id: "sub_1",
        categoryId: "cat_1",
        subCategoryName: "FOOD"
    },
    {
        id: "sub_2",
        categoryId: "cat_2",
        subCategoryName: "BEVERAGE"
    }
]


export const itemGroup = [
    {
        id: "item-1",
        subCategoryId: "sub_1",
        itemGroup: "FOOD"
    },
    {
        id: "item-2",
        subCategoryId: "sub_2",
        itemGroup: "IRISH WHISKY"
    },
    {
        id: "item-3",
        subCategoryId: "sub_2",
        itemGroup: "BOURBON AND RYE"
    }
]

export const itemCategory = [
    {
        id: "i-01",
        itemGroupId: "item-1",
        itemName: "Coconut cream milk 1 L",
        sku: "น้ำกะทิ 1ลิตร"
    },
    {
        id: "i-02",
        itemGroupId: "item-1",
        itemName: "CHERRY DARK SWEET 16 OZ",
        sku: "#011194156770"
    },
    {
        id: "i-03",
        itemGroupId: "item-1",
        itemName: "Dark Chocolate",
        sku: "Dark Chocolate ( Pepperide Farm ) Code 99840"
    },
    {
        id: "i-04",
        itemGroupId: "item-2",
        itemName: "JOHN JAMESONS",
        sku: "JOHN JAMESONS 70 CL"
    },
    {
        id: "i-05",
        itemGroupId: "item-3",
        itemName: "JIM BEAM",
        sku: "JIM BEAM 75 CL"
    },
    {
        id: "i-06",
        itemGroupId: "item-3",
        itemName: "CANADIAN CLUB",
        sku: "CANADIAN CLUB 75 CL"
    },
]