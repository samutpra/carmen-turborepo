
export type FieldType = 'string' | 'boolean' | 'number';

export interface Field<T> {
    key: keyof T;
    display: string;
    type: FieldType;
    options?: T[keyof T][];
    required?: boolean;
    validate?: (value: any) => string | undefined;
}
