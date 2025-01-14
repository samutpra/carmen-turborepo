import { RecipeListSkeleton } from '@/components/ui-custom/Loading/recipe-list-skeleton'
import React, { Suspense } from 'react'
import RecipeList from './components/RecipeList';

const RecipePage = () => {
    return (
        <div className="h-full flex flex-col gap-4 p-4 md:p-6">
            <Suspense fallback={<RecipeListSkeleton />}>
                <RecipeList />
            </Suspense>
        </div>
    )
}

export default RecipePage