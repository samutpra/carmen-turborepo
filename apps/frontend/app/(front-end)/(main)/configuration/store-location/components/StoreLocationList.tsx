"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { storeLocationData } from '../../data/data';
import { StoreLocationLabel, storeLocationSchema, storeLocationType } from '../../type';
import DialogDelete from '@/components/ui-custom/DialogDelete';
import ListViewData from '../../components/template/ListViewData';

const StoreLocationList = () => {
    const [storeLocations, setStoreLocations] = useState<storeLocationType[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | null>(null);

    // const [searchCriteria, setSearchCriteria] = useState<{
    //     [key: string]: string
    // }>({
    //     storeCode: '',
    //     storeName: '',
    //     departmentName: '',
    // });


    useEffect(() => {
        const fetchStoreLocations = async () => {
            const data = storeLocationData.map((data) => {
                return storeLocationSchema.parse(data);
            })
            setStoreLocations(data);
        }
        fetchStoreLocations();
    }, [])

    // const handleSearch = (key: string, value: string) => {
    //     console.log('Search Criteria:', { key, value });

    //     const newSearchCriteria = {
    //         ...searchCriteria,
    //         [key]: value
    //     };

    //     setSearchCriteria(newSearchCriteria);

    //     // Filter logic
    //     const filtered = storeLocations.filter(item => {
    //         return Object.entries(newSearchCriteria).every(([field, searchValue]) => {
    //             if (!searchValue) return true;
    //             return String(item[field as keyof storeLocationType])
    //                 .toLowerCase()
    //                 .includes(searchValue.toLowerCase());
    //         });
    //     });

    //     console.log('Current search criteria:', newSearchCriteria);
    //     console.log('Filtered results:', filtered);
    // };

    // const SearchFields = () => {
    //     return (
    //         <div className="mb-4 grid grid-cols-3 gap-4">
    //             {fieldConfigs
    //                 .filter(field => field.type === 'string')
    //                 .map(field => (
    //                     <div key={field.key} className="flex flex-col">
    //                         <label className="text-sm font-medium mb-1">
    //                             {field.display}
    //                         </label>
    //                         <input
    //                             className="p-2 border rounded"
    //                             type="text"
    //                             value={searchCriteria[field.key]}
    //                             onChange={(e) => handleSearch(field.key, e.target.value)}
    //                             placeholder={`Search ${field.display}`}
    //                         />
    //                     </div>
    //                 ))}
    //         </div>
    //     );
    // };

    const handleAdd = async (item: storeLocationType) => {
        setStoreLocations((prev) => [...prev, item]);
    };

    const handleEdit = async (updatedItem: storeLocationType) => {
        setStoreLocations((prev) =>
            prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );
    };

    const handleDelete = (item: storeLocationType) => {
        setIdToDelete(item.id);
        setIsDialogOpen(true);
    };

    const confirmDelete = () => {
        setStoreLocations((prev) => prev.filter((loc) => loc.id !== idToDelete));
        setIdToDelete(null);
    };

    const fieldConfigs: StoreLocationLabel[] = useMemo(() => [
        { key: 'storeCode', display: 'Store Code', type: 'string' },
        { key: 'storeName', display: 'Store Name', type: 'string' },
        { key: 'departmentName', display: 'Department', type: 'string' },
        { key: 'type', display: 'Type', type: 'string' },
        { key: 'status', display: 'Status', type: 'string' },
        { key: 'isActive', display: 'Active Status', type: 'boolean' }
    ], []);

    return (
        <>
            {/* <SearchFields /> */}
            <ListViewData
                data={storeLocations}
                title="Store Locations"
                titleField="storeName"
                fields={fieldConfigs}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <DialogDelete
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onConfirm={confirmDelete}
                idDelete={idToDelete}
            />
        </>
    )
}

export default StoreLocationList