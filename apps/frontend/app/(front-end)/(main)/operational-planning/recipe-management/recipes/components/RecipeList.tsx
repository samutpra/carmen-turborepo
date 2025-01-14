"use client";
import React, { useState } from 'react'
import { mockRecipes } from '../mockData';
import { Button } from '@/components/ui/button';
import { FileDown, LayoutGrid, List, Plus, Printer, SlidersHorizontal } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import RecipeCard from './RecipeCard';
import RecipeTable from './RecipeTable';
import * as m from '@/paraglide/messages.js';
import SearchForm from '@/components/ui-custom/SearchForm';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import { Link } from '@/lib/i18n';

const filterOptions = {
    categories: [
        { value: "all", label: "All Categories" },
        { value: "appetizers", label: "Appetizers" },
        { value: "main-courses", label: "Main Courses" },
        { value: "soups", label: "Soups" },
        { value: "salads", label: "Salads" },
        { value: "desserts", label: "Desserts" },
    ],
    cuisineTypes: [
        { value: "all", label: "All Cuisines" },
        { value: "international", label: "International" },
        { value: "italian", label: "Italian" },
        { value: "chinese", label: "Chinese" },
        { value: "japanese", label: "Japanese" },
        { value: "thai", label: "Thai" },
        { value: "indian", label: "Indian" },
        { value: "mediterranean", label: "Mediterranean" },
        { value: "french", label: "French" },
    ],
    preparationTimes: [
        { value: "all", label: "All Times" },
        { value: "under-15-mins", label: "Under 15 mins" },
        { value: "15-30-mins", label: "15-30 mins" },
        { value: "30-60-mins", label: "30-60 mins" },
        { value: "over-60-mins", label: "Over 60 mins" },
    ],
    difficultyLevels: [
        { value: "all", label: "All Levels" },
        { value: "easy", label: "Easy" },
        { value: "medium", label: "Medium" },
        { value: "hard", label: "Hard" },
        { value: "expert", label: "Expert" },
    ],
    status: [
        { value: "all", label: "All Status" },
        { value: "active", label: "Active" },
        { value: "draft", label: "Draft" },
        { value: "archived", label: "Archived" },
    ],
    sortOptions: [
        { value: "name", label: "Name" },
        { value: "lastUpdated", label: "Last Updated" },
        { value: "costPerPortion", label: "Cost (Low to High)" },
        { value: "costPerPortionDesc", label: "Cost (High to Low)" },
        { value: "grossMargin", label: "Margin" },
    ],
}

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

const RecipeList = () => {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [filters, setFilters] = useState<FilterOptions>(initialFilters);
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState("")

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFilterChange = (key: keyof FilterOptions, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }))
    }

    const getActiveFilterCount = () => {
        return Object.entries(filters).filter(([key, value]) => {
            if (Array.isArray(value) && key === 'costRange') {
                return value[0] > 0 || value[1] < 100
            }
            return value !== 'all' && value !== false
        }).length
    }

    const getFilteredRecipes = () => {
        return mockRecipes.filter(recipe => {
            // Search query filter
            if (searchQuery && !recipe.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false
            }

            // Category filter (normalize the comparison)
            if (filters.category !== 'all' && recipe.category.toLowerCase().replace(/\s+/g, '-') !== filters.category) {
                return false
            }

            // Cuisine filter
            if (filters.cuisine !== 'all' && recipe.cuisine.toLowerCase() !== filters.cuisine) {
                return false
            }

            // Cost range filter
            if (recipe.costPerPortion < filters.costRange[0] || recipe.costPerPortion > filters.costRange[1]) {
                return false
            }

            // Status filter
            if (filters.status !== 'all' && recipe.status !== filters.status) {
                return false
            }

            // Preparation time filter
            if (filters.preparationTime !== 'all' && recipe.preparationTime.toLowerCase() !== filters.preparationTime) {
                return false
            }

            // Difficulty filter
            if (filters.difficulty !== 'all' && recipe.difficulty.toLowerCase() !== filters.difficulty) {
                return false
            }

            // Has media filter
            if (filters.hasMedia && !recipe.hasMedia) {
                return false
            }

            return true
        })
    }

    const filteredRecipes = getFilteredRecipes();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getFilterLabel = (key: string, value: any) => {
        if (key === 'costRange') return `Cost: $${value[0]}-$${value[1]}`

        const option = filterOptions[key as keyof typeof filterOptions]?.find(
            opt => opt.value === value
        )

        if (option) return `${key}: ${option.label}`
        if (key === 'hasMedia') return 'Has Media'

        return `${key}: ${value}`
    };

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
                <Select
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
                </Select>
                <Popover open={showFilters} onOpenChange={setShowFilters}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="gap-2" size={'sm'}>
                            <SlidersHorizontal className="h-4 w-4" />
                            Filters
                            {getActiveFilterCount() > 0 && (
                                <Badge variant="secondary" className="ml-1">
                                    {getActiveFilterCount()}
                                </Badge>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-4">
                        <div className="space-y-4">
                            {/* Cuisine Type */}
                            <div className="space-y-2">
                                <Label className='text-xs'>Cuisine Type</Label>
                                <Select
                                    value={filters.cuisine}
                                    onValueChange={(value) => handleFilterChange('cuisine', value)}
                                >
                                    <SelectTrigger className='h-8'>
                                        <SelectValue placeholder="Select cuisine" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filterOptions.cuisineTypes.map((cuisine) => (
                                            <SelectItem key={cuisine.value} value={cuisine.value} className='text-xs'>
                                                {cuisine.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Cost Range */}
                            <div className="space-y-2">
                                <Label className='text-xs'>Cost Range ($)</Label>
                                <Slider
                                    value={filters.costRange}
                                    min={0}
                                    max={100}
                                    step={1}
                                    onValueChange={(value) => handleFilterChange('costRange', value)}
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>${filters.costRange[0]}</span>
                                    <span>${filters.costRange[1]}</span>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                                <Label className='text-xs'>Status</Label>
                                <Select
                                    value={filters.status}
                                    onValueChange={(value) => handleFilterChange('status', value)}
                                >
                                    <SelectTrigger className='h-8'>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filterOptions.status.map((status) => (
                                            <SelectItem key={status.value} value={status.value} className='text-xs'>
                                                {status.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Preparation Time */}
                            <div className="space-y-2">
                                <Label>Preparation Time</Label>
                                <Select
                                    value={filters.preparationTime}
                                    onValueChange={(value) => handleFilterChange('preparationTime', value)}
                                >
                                    <SelectTrigger className='h-8'>
                                        <SelectValue placeholder="Select time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filterOptions.preparationTimes.map((time) => (
                                            <SelectItem key={time.value} value={time.value} className='text-xs'>
                                                {time.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Difficulty Level */}
                            <div className="space-y-2">
                                <Label>Difficulty Level</Label>
                                <Select
                                    value={filters.difficulty}
                                    onValueChange={(value) => handleFilterChange('difficulty', value)}
                                >
                                    <SelectTrigger className='h-8'>
                                        <SelectValue placeholder="Select difficulty" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filterOptions.difficultyLevels.map((level) => (
                                            <SelectItem key={level.value} value={level.value} className='text-xs'>
                                                {level.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Has Media Toggle */}
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    checked={filters.hasMedia}
                                    onCheckedChange={(checked) => handleFilterChange('hasMedia', checked)}
                                />
                                <Label>Has Media</Label>
                            </div>

                            {/* Filter Actions */}
                            <div className="flex justify-between pt-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setFilters(initialFilters)}
                                    size={"sm"}
                                >
                                    Reset
                                </Button>
                                <Button onClick={() => setShowFilters(false)} size={'sm'}>
                                    Apply Filters
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

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
                {getActiveFilterCount() > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(filters).map(([key, value]) => {
                            if (value === 'all' || value === false) return null
                            if (key === 'costRange' && value[0] === 0 && value[1] === 100) return null

                            return (
                                <Badge
                                    key={key}
                                    variant="secondary"
                                    className="px-2 py-1"
                                    onClick={() => handleFilterChange(key as keyof FilterOptions, initialFilters[key as keyof FilterOptions])}
                                >
                                    {getFilterLabel(key, value)}
                                </Badge>
                            )
                        })}
                    </div>
                )}
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