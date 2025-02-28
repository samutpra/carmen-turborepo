import React from 'react'
import { EnhancedCategory, EnhancedSubCategory } from './ProductOrganizer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Folder, Pen, Plus } from 'lucide-react';
import SubCategory from './SubCategory';

interface Props {
    category: EnhancedCategory;
}

const Category = ({ category }: Props) => {

    const handleAddClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        alert("Add to category");
    };

    const handleEditClick = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        alert(`Edit sub category ${id}`);
    }


    return (
        <Accordion type="single" collapsible className="border-none">
            <AccordionItem value={category.id ?? ''} className="border-b-0">
                <AccordionTrigger className="py-2 font-medium hover:no-underline">
                    <div className="flex items-center gap-4">

                        <div className='flex items-center'>
                            <Folder className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className='text-xs font-semibold'>{category.name}</span>
                            <span className="text-xs text-muted-foreground ml-2">
                                ({category.subCategories.length})
                            </span>
                        </div>
                        <div className='flex items-center'>
                            <button
                                className="flex items-center justify-center p-1 rounded-md hover:bg-accent text-muted-foreground hover:text-accent-foreground focus:outline-none"
                                onClick={(e) => handleEditClick(e, category.id ?? '')}
                            >
                                <Pen className="h-3 w-3" />
                            </button>
                            <button
                                className="flex items-center justify-center p-1 rounded-md hover:bg-accent text-muted-foreground hover:text-accent-foreground focus:outline-none"
                                onClick={(e) => handleAddClick(e)}
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>

                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="ml-6 border-l border-border/30 pl-2 space-y-1">
                        {category.subCategories.length === 0 ? (
                            <div className="py-2 text-xs text-muted-foreground">Empty Sub Category</div>
                        ) : (
                            category.subCategories.map((subcategory: EnhancedSubCategory) => (
                                <SubCategory key={subcategory.id ?? ''} subcategory={subcategory} category_id={category.id ?? ''} />
                            ))
                        )}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}



export default Category