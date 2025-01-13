"use client";
import { Link, useRouter } from '@/lib/i18n';
import React, { useEffect, useState } from 'react'
import { productListData } from '../data';
import { useAuth } from '@/app/context/AuthContext';
import { useURL } from '@/hooks/useURL';
import { Button } from '@/components/ui/button';
import { FileDown, Plus, Printer } from 'lucide-react';
import * as m from '@/paraglide/messages.js';
import { statusOptions } from '@/lib/statusOptions';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import SearchForm from '@/components/ui-custom/SearchForm';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import ProductTable from './ProductTable';
import SkeletonTableLoading from '@/components/ui-custom/Loading/SkeltonTableLoading';
import SkeltonCardLoading from '@/components/ui-custom/Loading/SkeltonCardLoading';
import ProductCard from './ProductCard';

export interface ProductMainList {
  id: string;
  productCode: string;
  name: string;
  description?: string;
  categoryId: string;
  subCategoryId: string;
  itemGroup: string;
  basePrice: number;
  currency: string;
  isActive: boolean;
  primaryInventoryUnitId: string;
}
const ProductList = () => {
  const { accessToken } = useAuth();
  const token = accessToken || '';
  const tenantId = 'DUMMY';
  const router = useRouter();
  const [products, setProducts] = useState<ProductMainList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusOpen, setStatusOpen] = useState(false);
  const [search, setSearch] = useURL('search');
  const [status, setStatus] = useURL('status');
  const fetchProducts = () => {
    try {
      setIsLoading(true);
      setProducts(productListData.products)
    } catch (error) {
      console.log('error', error);

    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [token, tenantId]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearch(event.currentTarget.search.value);
  };

  const title = 'Product List';

  const actionButtons = (
    <div className="action-btn-container">
      <Button asChild variant={'outline'} size={'sm'}>
        <Link href="/vendor-management/vendors/new">
          <Plus className="h-4 w-4" />
          Product
        </Link>
      </Button>
      <Button variant="outline" className="group" size={'sm'}>
        <FileDown className="h-4 w-4" />
        {m.export_text()}
      </Button>
      <Button variant="outline" size={'sm'}>
        <Printer className="h-4 w-4" />
        {m.print_text()}
      </Button>
    </div>
  );

  const filter = (
    <div className="filter-container">
      <SearchForm
        onSubmit={handleSearch}
        defaultValue={search}
        placeholder={`${m.Search()} ${m.Vendor()}...`}
      />
      <div className="all-center gap-2">
        <Popover open={statusOpen} onOpenChange={setStatusOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={statusOpen}
              className="btn-combobox"
              size={'sm'}
            >
              {status
                ? statusOptions.find((option) => option.value === status)?.label
                : `${m.select_status()}`}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="pop-content">
            <Command>
              <CommandInput placeholder={`${m.Search()} ${m.status_text()}`} className="h-9" />
              <CommandList>
                <CommandEmpty>No status found.</CommandEmpty>
                <CommandGroup>
                  {statusOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => {
                        setStatus(option.value);
                        setStatusOpen(false);
                      }}
                    >
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <>
        <div className='block md:hidden'>
          <SkeltonCardLoading />
        </div>
        <div className='hidden md:block'>
          <SkeletonTableLoading />;
        </div>
      </>
    )
  }

  const content = (
    <>
      <div className="block md:hidden">
        <ProductCard
          products={products}
        />
      </div>
      <div className="hidden md:block">
        <ProductTable
          products={products}
        />
      </div>
    </>
  );

  return (
    <DataDisplayTemplate
      title={title}
      actionButtons={actionButtons}
      filters={filter}
      content={content}
    />
  )
}

export default ProductList