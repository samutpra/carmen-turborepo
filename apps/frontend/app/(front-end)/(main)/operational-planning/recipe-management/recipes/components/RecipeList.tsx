"use client";
import React, { useState } from 'react'
import { FILTER_FIELDS, FILTER_OPERATORS, mockRecipes, Recipe } from '../mockData';
import { Button } from '@/components/ui/button';
import { FileDown, LayoutGrid, List, Plus, Printer, SlidersHorizontal, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import RecipeCard from './RecipeCard';
import RecipeTable from './RecipeTable';
import * as m from '@/paraglide/messages.js';
import SearchForm from '@/components/ui-custom/SearchForm';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import { Link } from '@/lib/i18n';
import { Input } from '@/components/ui/input';

interface FilterOptions {
    category: string
    cuisine: string
    costRange: [number, number]
    status: string
    preparationTime: string
    difficulty: string
    hasMedia: boolean
}

const initialFilters: FilterOptions = {
    category: "all",
    cuisine: "all",
    costRange: [0, 100],
    status: "all",
    preparationTime: "all",
    difficulty: "all",
    hasMedia: false,
}

interface FilterCondition {
    id: string
    field: string
    operator: string
    value: string
}

const RecipeList = () => {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [filters, setFilters] = useState<FilterOptions>(initialFilters);
    const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("")
    const [quickFilters, setQuickFilters] = useState<string[]>([])
    const [filterConditions, setFilterConditions] = useState<FilterCondition[]>([])
    const [selectedRecipes, setSelectedRecipes] = useState<string[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFilterChange = (key: keyof FilterOptions, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }))
    }

    const handleQuickFilter = (filter: string) => {
        setQuickFilters(prev => {
            const newFilters = prev.includes(filter)
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
            return newFilters
        })
    }

    const addFilterCondition = () => {
        const newCondition: FilterCondition = {
            id: Math.random().toString(36).substr(2, 9),
            field: FILTER_FIELDS[0].value,
            operator: FILTER_OPERATORS[0].value,
            value: "",
        }
        setFilterConditions([...filterConditions, newCondition])
    }


    const getActiveFilterCount = () => {
        return Object.entries(filters).filter(([key, value]) => {
            if (Array.isArray(value) && key === 'costRange') {
                return value[0] > 0 || value[1] < 100
            }
            return value !== 'all' && value !== false
        }).length
    }

    const removeFilterCondition = (id: string) => {
        setFilterConditions(filterConditions.filter((condition) => condition.id !== id))
    }

    const clearFilters = () => {
        setFilterConditions([])
        setQuickFilters([])
    }

    const updateFilterCondition = (
        id: string,
        field: keyof FilterCondition,
        value: string
    ) => {
        setFilterConditions(
            filterConditions.map((condition) =>
                condition.id === id ? { ...condition, [field]: value } : condition
            )
        )
    }

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedRecipes(filteredRecipes.map(recipe => recipe.id))
        } else {
            setSelectedRecipes([])
        }
    }

    const handleSelect = (recipeId: string, checked: boolean) => {
        if (checked) {
            setSelectedRecipes([...selectedRecipes, recipeId])
        } else {
            setSelectedRecipes(selectedRecipes.filter(id => id !== recipeId))
        }
    }


    const filteredRecipes = mockRecipes.filter(recipe => {
        // Search filter
        if (searchTerm && !recipe.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false
        }

        // Quick filters
        if (quickFilters.includes('noMedia') && recipe.hasMedia) return false
        if (quickFilters.includes('hasMedia') && !recipe.hasMedia) return false
        if (quickFilters.includes('active') && recipe.status !== 'active') return false
        if (quickFilters.includes('draft') && recipe.status !== 'draft') return false

        // Advanced filters
        for (const condition of filterConditions) {
            const value = recipe[condition.field as keyof Recipe]
            if (value === undefined) continue

            switch (condition.operator) {
                case 'contains':
                    if (!String(value).toLowerCase().includes(condition.value.toLowerCase())) return false
                    break
                case 'equals':
                    if (String(value) !== condition.value) return false
                    break
                case 'notEquals':
                    if (String(value) === condition.value) return false
                    break
                case 'greaterThan':
                    if (typeof value === 'number' && value <= Number(condition.value)) return false
                    break
                case 'lessThan':
                    if (typeof value === 'number' && value >= Number(condition.value)) return false
                    break
                case 'isEmpty':
                    if (value !== '') return false
                    break
                case 'isNotEmpty':
                    if (value === '') return false
                    break
            }
        }

        return true
    })

    const title = "Recipe Library";

    const actionButtons = (
        <div className="action-btn-container">
            <Button asChild variant={'outline'} size={'sm'}>
                <Link href="/vendor-management/vendors/new">
                    <Plus className="h-4 w-4" />
                    New Recipe
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
        <div className='filter-container'>
            <SearchForm
                onSearch={setSearchQuery}
                defaultValue={searchQuery}
                placeholder={`${m.Search()}...`}
            />
            <div className="all-center gap-2">
                <Button
                    variant={quickFilters.includes('noMedia') ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleQuickFilter('noMedia')}
                >
                    No Media
                </Button>
                <Button
                    variant={quickFilters.includes('hasMedia') ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleQuickFilter('hasMedia')}
                >
                    Has Media
                </Button>
                <Button
                    variant={quickFilters.includes('active') ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleQuickFilter('active')}
                >
                    Active
                </Button>
                <Button
                    variant={quickFilters.includes('draft') ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleQuickFilter('draft')}
                >
                    Draft
                </Button>
                {/* <Select
                    value={filters.category}
                    onValueChange={(value) => handleFilterChange('category', value)}
                >
                    <SelectTrigger className="w-[180px] h-8">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent >
                        {filterOptions.categories.map((category) => (
                            <SelectItem key={category.value} value={category.value} className='text-xs'>
                                {category.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select> */}
                <Popover open={isAdvancedFilterOpen} onOpenChange={setIsAdvancedFilterOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">
                            <SlidersHorizontal className="h-4 w-4 mr-2" />
                            Advanced Filters
                            {getActiveFilterCount() > 0 && (
                                <Badge variant="secondary" className="ml-2">
                                    {getActiveFilterCount()}
                                </Badge>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-4" align="end">
                        <div className="space-y-4">
                            <div className="font-medium flex items-center justify-between border-b pb-2">
                                <div className="flex items-center gap-2">
                                    <SlidersHorizontal className="h-4 w-4" />
                                    Advanced Filters
                                </div>
                                {filterConditions.length > 0 && (
                                    <Badge variant="secondary" className="ml-2">
                                        {filterConditions.length}
                                    </Badge>
                                )}
                            </div>
                            {filterConditions.map((condition) => (
                                <div key={condition.id} className="flex items-center gap-2">
                                    <Select
                                        value={condition.field}
                                        onValueChange={(value) =>
                                            updateFilterCondition(condition.id, "field", value)
                                        }
                                    >
                                        <SelectTrigger className="w-[120px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {FILTER_FIELDS.map((field) => (
                                                <SelectItem key={field.value} value={field.value}>
                                                    {field.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Select
                                        value={condition.operator}
                                        onValueChange={(value) =>
                                            updateFilterCondition(condition.id, "operator", value)
                                        }
                                    >
                                        <SelectTrigger className="w-[120px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {FILTER_OPERATORS.map((operator) => (
                                                <SelectItem key={operator.value} value={operator.value}>
                                                    {operator.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {!["isEmpty", "isNotEmpty"].includes(condition.operator) && (
                                        <Input
                                            value={condition.value}
                                            onChange={(e) =>
                                                updateFilterCondition(
                                                    condition.id,
                                                    "value",
                                                    e.target.value
                                                )
                                            }
                                            className="flex-1"
                                            placeholder="Value"
                                        />
                                    )}
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeFilterCondition(condition.id)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={addFilterCondition}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Filter Condition
                            </Button>
                            <div className="flex justify-between pt-2 border-t">
                                <Button variant="ghost" size="sm" onClick={clearFilters}>
                                    Reset
                                </Button>
                                <Button size="sm" onClick={() => setIsAdvancedFilterOpen(false)}>
                                    Apply Filters
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
                {getActiveFilterCount() > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-muted-foreground"
                    >
                        <X className="h-4 w-4 mr-1" />
                        Clear All
                    </Button>
                )}

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}

                >
                    {viewMode === "grid" ? (
                        <List className="h-4 w-4" />
                    ) : (
                        <LayoutGrid className="h-4 w-4" />
                    )}
                </Button>

            </div>
        </div>
    )

    const content = (
        <>
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
                {filteredRecipes.length === 0 ? (
                    <div className="col-span-full text-center py-8 text-muted-foreground">
                        No recipes found matching your filters
                    </div>
                ) : viewMode === "grid" ? (
                    filteredRecipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))
                ) : (
                    <RecipeTable recipes={filteredRecipes} />
                )}
            </div>
            <div className="text-sm text-muted-foreground">
                Showing {filteredRecipes.length} of {mockRecipes.length} recipes
            </div>
        </>
    )

    return (
        <DataDisplayTemplate
            title={title}
            actionButtons={actionButtons}
            filters={filter}
            content={content}
        />
    )
}

export default RecipeList