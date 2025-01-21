export enum SORT_OPTIONS {
    NAME = 'name',
    CODE = 'iso_code',
    SYMBOL = 'symbol',
}

export const sortFields = [
    { key: SORT_OPTIONS.NAME, label: 'Name' },
    { key: SORT_OPTIONS.CODE, label: 'ISO Code' },
    { key: SORT_OPTIONS.SYMBOL, label: 'Symbol' },
];

export const toggleSort = (field: SORT_OPTIONS, currentValue: string): string => {
    if (currentValue === field) {
        return `${field}:desc`;
    } else if (currentValue === `${field}:desc`) {
        return field;
    } else {
        return field;
    }
};

export const isValidSortOption = (value: string): value is SORT_OPTIONS =>
    Object.values(SORT_OPTIONS).includes(value as SORT_OPTIONS);
