'use client';
import { useParams } from 'next/navigation'
import React from 'react'
import { mockRecipes } from '../mockData';
import RecipeDetails from './components/RecipeDetails';

const RecipeIDPage = () => {
    const { id } = useParams() as { id: string }
    const recipe = mockRecipes.find(r => r.id === id)
    return (
        <RecipeDetails recipe={recipe} />
    )
}

export default RecipeIDPage