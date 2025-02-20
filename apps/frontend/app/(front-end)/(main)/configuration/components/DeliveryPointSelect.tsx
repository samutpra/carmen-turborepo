interface DeliveryPointSelectProps {
	value: string;
	onValueChange: (value: string) => void;
	items: DeliveryPointCreateModel[];
	disabled?: boolean;
}

const DeliveryPointSelect = ({
	value,
	onValueChange,
	items,
	disabled,
}: DeliveryPointSelectProps) => {
	return (
		<Select value={value} onValueChange={onValueChange} disabled={disabled}>
			<SelectTrigger>
				<SelectValue placeholder="Select delivery point">
					{items.find((item) => item.id === value)?.name}
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				{items.map((item) => (
					<SelectItem key={item.id} value={item.id} className="cursor-pointer">
						{item.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default DeliveryPointSelect;
