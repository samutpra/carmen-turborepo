// Category interface
export interface Category {
    id: string;
    name: string;
}

// SubCategory interface
export interface SubCategory {
    id: string;
    name: string;
    categoriesID: string;
}

// ItemGroup interface
export interface ItemGroup {
    id: string;
    name: string;
    subCategoriesId: string;
}

export const categoriesData: Category[] = [
    { id: "1", name: "Electronics" },
    { id: "2", name: "Clothing" },
    { id: "3", name: "Home Appliances" },
];

export const subCategoriesData: SubCategory[] = [
    { id: "1", name: "Smartphones", categoriesID: "1" },
    { id: "2", name: "Laptops", categoriesID: "1" },
    { id: "3", name: "Televisions", categoriesID: "1" },
    { id: "4", name: "Men's Wear", categoriesID: "2" },
    { id: "5", name: "Women's Wear", categoriesID: "2" },
    { id: "6", name: "Kitchen Appliances", categoriesID: "3" },
    { id: "7", name: "Cleaning Equipment", categoriesID: "3" },
];

export const itemGroupsData: ItemGroup[] = [
    { id: "1", name: "Gaming Notebooks", subCategoriesId: "2" },
    { id: "2", name: "Ultrabooks", subCategoriesId: "2" },
    { id: "3", name: "OLED TVs", subCategoriesId: "3" },
    { id: "4", name: "4K Smart TVs", subCategoriesId: "3" },
    { id: "5", name: "Formal Shirts", subCategoriesId: "4" },
    { id: "6", name: "Casual Trousers", subCategoriesId: "4" },
    { id: "7", name: "Dresses", subCategoriesId: "5" },
    { id: "8", name: "Blouses", subCategoriesId: "5" },
    { id: "9", name: "Microwaves", subCategoriesId: "6" },
    { id: "10", name: "Toasters", subCategoriesId: "6" },
    { id: "11", name: "Vacuum Cleaners", subCategoriesId: "7" },
    { id: "12", name: "Steam Mops", subCategoriesId: "7" },
];