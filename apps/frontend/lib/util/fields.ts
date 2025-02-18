import { enum_location_type } from '@/dtos/location.dto';

export const locationField = [
	{ label: 'Inventory', value: enum_location_type.inventory },
	{ label: 'Direct', value: enum_location_type.direct },
	{ label: 'Consignment', value: enum_location_type.consignment },
];
