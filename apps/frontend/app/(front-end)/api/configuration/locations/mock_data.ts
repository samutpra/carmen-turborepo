import { enum_location_type, LocationsModel } from '@/dtos/location.dto';

export const locationsDetail: LocationsModel = {
	id: '0a3721e1-834b-47eb-a0f7-32eb7d9509e6',
	name: 'New Location',
	description: 'Pool bar description',
	is_active: true,
	location_type: enum_location_type.direct,
	delivery_point: {
		id: '0da3ffe5-e27e-4379-90b7-ce0ab67e424a',
		name: 'Front Office',
	},
	users: {
		active: [
			{
				id: '550e8400-e29b-41d4-a716-446655440001',
				full_name: 'จอห์น โด',
				email: 'john.doe@example.com',
			},
			{
				id: '660e8400-e29b-41d4-a716-446655440002',
				full_name: '田中 弘',
				email: 'hiroshi.tanaka@example.jp',
			},
			{
				id: '770e8400-e29b-41d4-a716-446655440003',
				full_name: '𞤀𞤥𞤢𞥄𞤪𞤢 𞤁𞤭𞤢𞤤𞤤𞤮',
				email: 'amara.diallo@example.sn',
			},
			{
				id: '880e8400-e29b-41d4-a716-446655440004',
				full_name: 'محمد العتيبي',
				email: 'mohammed.alotaibi@example.sa',
			},
			{
				id: '990e8400-e29b-41d4-a716-446655440005',
				full_name: 'Élodie Dupont',
				email: 'elodie.dupont@example.fr',
			},
			{
				id: 'aa0e8400-e29b-41d4-a716-446655440006',
				full_name: 'Иван Петров',
				email: 'ivan.petrov@example.ru',
			},
			{
				id: 'bb0e8400-e29b-41d4-a716-446655440007',
				full_name: 'Nguyễn Văn An',
				email: 'nguyen.vanan@example.vn',
			},
			{
				id: 'cc0e8400-e29b-41d4-a716-446655440008',
				full_name: '김민준',
				email: 'minjun.kim@example.kr',
			},
			{
				id: 'dd0e8400-e29b-41d4-a716-446655440009',
				full_name: 'Alice Smith',
				email: 'alice.smith@example.com',
			},
			{
				id: 'ee0e8400-e29b-41d4-a716-446655440010',
				full_name: 'Marta Kowalska',
				email: 'marta.kowalska@example.pl',
			},
		],
		in_active: [
			{
				id: 'ff0e8400-e29b-41d4-a716-446655440011',
				full_name: 'Luca Rossi',
				email: 'luca.rossi@example.it',
			},
			{
				id: '110e8400-e29b-41d4-a716-446655440012',
				full_name: 'Carlos Fernández',
				email: 'carlos.fernandez@example.com.ar',
			},
			{
				id: '220e8400-e29b-41d4-a716-446655440013',
				full_name: 'Mikhail Ivanov',
				email: 'mikhail.ivanov@example.ru',
			},
			{
				id: '330e8400-e29b-41d4-a716-446655440014',
				full_name: 'Chen Wei',
				email: 'chen.wei@example.cn',
			},
			{
				id: '440e8400-e29b-41d4-a716-446655440015',
				full_name: 'Aisha Abdullahi',
				email: 'aisha.abdullahi@example.ng',
			},
			{
				id: '550e8400-e29b-41d4-a716-446655440016',
				full_name: 'Sophia Müller',
				email: 'sophia.muller@example.de',
			},
			{
				id: '660e8400-e29b-41d4-a716-446655440017',
				full_name: 'Rajesh Kumar',
				email: 'rajesh.kumar@example.in',
			},
			{
				id: '770e8400-e29b-41d4-a716-446655440018',
				full_name: 'Fatima Zahra',
				email: 'fatima.zahra@example.ma',
			},
			{
				id: '880e8400-e29b-41d4-a716-446655440019',
				full_name: 'Omar Al-Farsi',
				email: 'omar.alfarsi@example.om',
			},
			{
				id: '990e8400-e29b-41d4-a716-446655440020',
				full_name: 'Elena Popescu',
				email: 'elena.popescu@example.ro',
			},
		],
	},
};

export const availableUsers = [
	{
		id: '345678',
		full_name: 'محمد الأحمد',
		email: 'mohammed.ahmed@example.sa',
	},
	{
		id: '456789',
		full_name: 'Алексей Иванов',
		email: 'alexey.ivanov@example.ru',
	},
	{
		id: '567890',
		full_name: 'Jean Dupont',
		email: 'jean.dupont@example.fr',
	},
	{
		id: '890123',
		full_name: 'Hans Müller',
		email: 'hans.muller@example.de',
	},
	{
		id: '901234',
		full_name: 'Chen Wei',
		email: 'chen.wei@example.cn',
	},
	{
		id: '012345',
		full_name: 'Raj Patel',
		email: 'raj.patel@example.in',
	},
	{
		id: '112233',
		full_name: 'Amara Diallo',
		email: 'amara.diallo@example.sn',
	},
];
