type RenderFunction<T> = (value: T[keyof T], item?: T) => React.ReactNode;
export interface FieldConfig<T> {
	key: keyof T;
	label: string;
	type?: 'text' | 'badge' | 'custom';
	render?: RenderFunction<T>;
	width?: string;
	align?: 'left' | 'center' | 'right';
	className?: string;
}
