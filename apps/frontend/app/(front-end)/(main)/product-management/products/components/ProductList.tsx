"use client";

import { Link } from '@/lib/i18n';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useURL } from '@/hooks/useURL';
import { Button } from '@/components/ui/button';
import { FileDown, Plus, Printer } from 'lucide-react';
import * as m from '@/paraglide/messages.js';
import { statusOptions } from '@/lib/statusOptions';
import SearchForm from '@/components/ui-custom/SearchForm';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import { ProductCreateModel } from '@carmensoftware/shared-dtos/src/product.dto';
import { fetchProducts } from '../../actions/product';
import { toastError } from '@/components/ui-custom/Toast';
import StatusSearchDropdown from '@/components/ui-custom/StatusSearchDropdown';
import SortDropDown from '@/components/ui-custom/SortDropDown';
import { FieldConfig } from '@/lib/util/uiConfig';
import SkeltonLoad from '@/components/ui-custom/Loading/SkeltonLoad';
import ProductDisplay from './ProductDisplay';

enum ProductField {
  NAME = 'name',
  CODE = 'code',
  DESCRIPYION = 'description',
  CATEGORY = 'category',
  SUBCATEGORY = 'subcategory',
  ITEM_GROUP = 'itemGroup',
  STATUS = 'product_status_type',
}

const fields: FieldConfig<ProductCreateModel>[] = [
  { key: ProductField.NAME as keyof ProductCreateModel, label: 'Name' },
  { key: ProductField.CODE as keyof ProductCreateModel, label: 'Code' },
  { key: ProductField.DESCRIPYION as keyof ProductCreateModel, label: 'Description' },
  { key: ProductField.CATEGORY as keyof ProductCreateModel, label: 'Category' },
  { key: ProductField.SUBCATEGORY as keyof ProductCreateModel, label: 'Subcategory' },
  { key: ProductField.ITEM_GROUP as keyof ProductCreateModel, label: 'Item Group' },
  { key: ProductField.STATUS as keyof ProductCreateModel, label: 'Status' },
];

const ProductList = () => {
  const { accessToken } = useAuth();
  const token = accessToken || '';
  const tenantId = 'DUMMY';
  const [products, setProducts] = useState<ProductCreateModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusOpen, setStatusOpen] = useState(false);
  const [search, setSearch] = useURL('search');
  const [status, setStatus] = useURL('status');
  const [page, setPage] = useURL('page');
  const [perpage, setPerpage] = useURL('perpage');
  const [totalPage, setTotalPage] = useURL('totalPage');

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchProducts(token, tenantId, {
        search,
        status,
        page,
        perpage
      });

      console.log('data', data);
      setProducts(data.data);
      setPage(data.pagination.page);
      setPerpage(data.pagination.perpage);
      setTotalPage(data.pagination.total);
    } catch (error) {
      console.log('error', error);
      toastError({ message: 'Failed to fetch products' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, tenantId, search, status]);

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const actionButtons = (
    <div className="flex items-center gap-2">
      <Button asChild variant="outline" size="sm">
        <Link href="/vendor-management/vendors/new">
          <Plus className="h-4 w-4 mr-2" />
          New product
        </Link>
      </Button>
      <Button variant="outline" className="group" size="sm">
        <FileDown className="h-4 w-4 mr-2" />
        {m.export_text()}
      </Button>
      <Button variant="outline" size="sm">
        <Printer className="h-4 w-4 mr-2" />
        {m.print_text()}
      </Button>
    </div>
  );

  const filter = (
    <div className="filter-container">
      <SearchForm
        onSearch={setSearch}
        defaultValue={search}
        placeholder={`${m.Search()} ...`}
      />
      <div className="all-center gap-2">
        <StatusSearchDropdown
          options={statusOptions}
          value={status}
          onChange={setStatus}
          open={statusOpen}
          onOpenChange={setStatusOpen}
        />
        <SortDropDown
          fieldConfigs={fields}
          items={products}
          onSort={setProducts}
        />
      </div>

    </div>
  );

  if (isLoading) return <SkeltonLoad />

  const content = (
    <ProductDisplay
      products={products}
      fields={fields}
      page={+page}
      totalPage={+totalPage}
    />
  );


  return (
    <DataDisplayTemplate
      title='Products List'
      actionButtons={actionButtons}
      filters={filter}
      content={content}
    />
  );
};

export default ProductList;