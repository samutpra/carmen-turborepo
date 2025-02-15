'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Inventory from './components/tab/Inventory';
import OrderUnit from './components/tab/OrderUnit';
import IngredientUnit from './components/tab/IngredientUnit';
import Location from './components/tab/Location';
import { AttributesDTO, PriceDTO, ProductModel } from '@/dtos/product.dto';
import ProductAttributes from './components/tab/ProductAttributes';
import PricingInformation from './components/tab/PricingInformation';
import { LocationChanges, LocationData } from '@/dtos/location.dto';
import { getLocations } from '../../actions/product';
import { fetchLocationList } from '../../actions/product';
import { LocationCreateModel } from '@/dtos/location.dto';
import { fetchOrderUnits, fetchProduct } from '../actions/product';
import ProductInfoHeader from './components/ProductInfoHeader';
import ProductLoading from '@/components/ui-custom/Loading/ProductLoading';
import { OrderUnitModel } from '@/dtos/order-unit.dto';
import { updateNestedObject } from '@/lib/util/updateNestedObject';

export const enum PRODUCT_ACTION {
	ADD,
	EDIT,
	DELETE,
}

const ProductDetail = ({ params }: { params: { id: string } }) => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [product, setProduct] = useState<ProductModel>();
	const [productLoading, setProductLoading] = useState(true);
	const [locationsLoading, setLocationsLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const [locations, setLocations] = useState<LocationChanges>({
		add: [],
		edit: [],
		delete: [],
	});
	const [originalLocations, setOriginalLocations] = useState<LocationData[]>(
		[]
	);
	const [locationsList, setLocationsList] = useState<LocationCreateModel[]>([]);
	const [isAddingNew, setIsAddingNew] = useState(false);
	const [newLocationId, setNewLocationId] = useState<string>('');
	const [locationError, setLocationError] = useState<string | null>(null);
	const [state, setState] = useState<{
		addedLocations: { location_id: string }[];
		editedLocations: { location_id: string }[];
		deletedLocations: { location_id: string }[];
	}>({
		addedLocations: [],
		editedLocations: [],
		deletedLocations: [],
	});
	const [orderUnitsList, setOrderUnitList] = useState<OrderUnitModel[]>([]);
	const [orderUnitLoading, setOrderUnitLoading] = useState(true);

	useEffect(() => {
		const getOrderUnit = async () => {
			if (!params.id || !token || !tenantId) {
				setOrderUnitLoading(false);
				return;
			}
			setOrderUnitLoading(true);
			try {
				const data = await fetchOrderUnits(token, tenantId, params.id);
				setOrderUnitList(data.data);
			} catch (err: unknown) {
				console.error('Failed to fetch order units:', err);
			} finally {
				setOrderUnitLoading(false);
			}
		};

		getOrderUnit();
	}, [token, tenantId, params.id]);

	useEffect(() => {
		fetchProduct(
			params.id,
			token,
			tenantId,
		);
	}, [params.id, token]);

	useEffect(() => {
		const fetchLocations = async () => {
			if (!params.id || !token) {
				setLocationsLoading(false);
				return;
			}
			setLocationsLoading(true);
			try {

				const data = await getLocations(params.id, token, tenantId)
				setOriginalLocations(data)
			} catch (err: unknown) {
				console.error('Failed to fetch locations:', err);
			} finally {
				setLocationsLoading(false);
			}
		};
		fetchLocations();
	}, [params.id, token, tenantId]);

	const handleFetchLocationList = async () => {
		if (locationsList.length > 0) return;

		setLocationsLoading(true);
		try {
			const response = await fetchLocationList(token, tenantId);
			if (!response) {
				throw new Error('No data received');
			}
			setLocationsList(response);
			setLocationError(null);
		} catch (err: unknown) {
			console.error('Failed to fetch location list:', err);
			setLocationError('Failed to fetch location data. Please try again.');
			setLocationsList([]);
		} finally {
			setLocationsLoading(false);
		}
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleCancel = () => {
		setIsEditing(false);
	};

	const handleChange = (path: string, value: string | number) => {
		if (!product) return;

		const updatedProduct = { ...product };
		if (path.includes('attribute')) {
			const match = path.match(/attribute\[(\d+)\]\.(\w+)/);
			if (match) {
				const [, index, field] = match;
				const attributes = [
					...(updatedProduct.data.tb_product_info?.info?.attribute || []),
				];

				if (!updatedProduct.data.tb_product_info) {
					updatedProduct.data.tb_product_info = {
						id: '',
						product_id: '',
						product_item_group_id: '',
						is_ingredients: false,
						price: '',
						tax_type: '',
						tax_rate: '',
						price_deviation_limit: '',
						created_at: new Date().toISOString(),
						created_by_id: '',
						updated_at: new Date().toISOString(),
						updated_by_id: '',
						info: {
							attribute: [],
							something: [],
						},
					};
				}

				attributes[Number(index)] = {
					...attributes[Number(index)],
					[field]: value,
				};

				updatedProduct.data.tb_product_info.info.attribute = attributes;
				setProduct(updatedProduct);
			}
		} else {
			const updated = updateNestedObject({ ...product }, path, value);
			setProduct(updated);
		}

		console.log('Updated path:', path, 'New value:', value);
	};

	const handleSave = () => {
		console.log('Saving product data:', product);
		console.log('locations', locations);
		setIsEditing(false);
	};

	useEffect(() => {
		setLocations({
			add: state.addedLocations,
			edit: state.editedLocations,
			delete: state.deletedLocations,
		});
	}, [state]);

	const handleLocationStateChange = (action: {
		type: PRODUCT_ACTION;
		payload: { location_id: string };
	}) => {
		setState((prevState) => {
			switch (action.type) {
				case PRODUCT_ACTION.ADD:
					return {
						...prevState,
						addedLocations: [...prevState.addedLocations, action.payload],
					};
				case PRODUCT_ACTION.EDIT:
					if (
						!prevState.editedLocations.some(
							(loc) => loc.location_id === action.payload.location_id
						)
					) {
						return {
							...prevState,
							editedLocations: [...prevState.editedLocations, action.payload],
						};
					}
					return prevState;
				case PRODUCT_ACTION.DELETE:
					return {
						...prevState,
						addedLocations: prevState.addedLocations.filter(
							(loc) => loc.location_id !== action.payload.location_id
						),
						editedLocations: prevState.editedLocations.filter(
							(loc) => loc.location_id !== action.payload.location_id
						),
						deletedLocations: [...prevState.deletedLocations, action.payload],
					};
				default:
					return prevState;
			}
		});
	};

	if (productLoading) {
		return <ProductLoading />;
	}

	const priceDetail: PriceDTO = {
		price: product?.data.tb_product_info?.price || '',
		tax_type: product?.data.tb_product_info?.tax_type || '',
		tax_rate: product?.data.tb_product_info?.tax_rate || '',
		price_deviation_limit:
			product?.data.tb_product_info?.price_deviation_limit || '',
	};

	const dataAttributes: AttributesDTO = {
		info: {
			attribute:
				product?.data.tb_product_info?.info?.attribute?.map((item) => ({
					label: item?.label,
					value: item?.value,
				})) ?? [],
		},
	};

	const productTabs = [
		{
			label: 'Basic Info',
			value: 'basic',
			content: (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div className="space-y-4">
						<ProductAttributes
							info={dataAttributes}
							isEditing={isEditing}
							handleChange={handleChange}
						/>
						<PricingInformation
							data={priceDetail}
							isEditing={isEditing}
							handleChange={handleChange}
						/>
					</div>
				</div>
			),
		},
		{
			label: 'Location',
			value: 'location',
			content: (
				<Location
					isEdit={isEditing}
					originalLocations={originalLocations}
					setOriginalLocations={setOriginalLocations}
					loading={locationsLoading}
					locationsList={locationsList}
					isAddingNew={isAddingNew}
					setIsAddingNew={setIsAddingNew}
					newLocationId={newLocationId}
					setNewLocationId={setNewLocationId}
					locationError={locationError}
					setLocationError={setLocationError}
					handleFetchLocationList={handleFetchLocationList}
					locationState={state}
					onLocationStateChange={handleLocationStateChange}
				/>
			),
		},
		{
			label: 'Order Unit',
			value: 'orderUnit',
			content: (
				<OrderUnit
					isEdit={isEditing}
					productCode={product?.data.code || ''}
					productName={product?.data.name || ''}
					orderUnitList={orderUnitsList}
					loading={orderUnitLoading}
				/>
			),
		},
		{
			label: 'Ingredient Unit',
			value: 'ingredientUnit',
			content: <IngredientUnit />,
		},
		{
			label: 'Inventory',
			value: 'inventory',
			content: <Inventory />,
		},
	];

	const content = (
		<>
			<Tabs defaultValue="basic">
				<TabsList>
					{productTabs.map((tab) => (
						<TabsTrigger key={tab.value} className="text-xs" value={tab.value}>
							{tab.label}
						</TabsTrigger>
					))}
				</TabsList>
				{productTabs.map((tab) => (
					<TabsContent key={tab.value} value={tab.value}>
						{tab.content}
					</TabsContent>
				))}
			</Tabs>
		</>
	);

	return (
		<div className="container mx-auto py-4">
			<div className="flex flex-col">
				<div className="px-6">
					<ProductInfoHeader
						product={product}
						isEditing={isEditing}
						handleChange={handleChange}
						handleSave={handleSave}
						handleCancel={handleCancel}
						handleEdit={handleEdit}
					/>
				</div>
			</div>
			<div className="p-6">{content}</div>
		</div>
	);
};

export default ProductDetail;