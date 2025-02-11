import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Ingredient, Recipe } from '@/dtos/recipe.dto';
import { Link } from '@/lib/i18n';
import {
	ArrowLeft,
	Edit,
	FileDown,
	Printer,
	Share2,
	History,
	Clock,
	Leaf,
	Plus,
	Info,
	Thermometer,
} from 'lucide-react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Label } from '@/components/ui/label';

interface GroupedIngredients {
	[key: string]: Ingredient[];
}

const groupIngredientsByComponent = (
	ingredients: Ingredient[]
): GroupedIngredients => {
	return ingredients.reduce((acc: GroupedIngredients, ingredient) => {
		const component =
			ingredient.type === 'recipe' ? 'Base Recipes' : 'Main Ingredients';
		if (!acc[component]) {
			acc[component] = [];
		}
		acc[component].push(ingredient);
		return acc;
	}, {});
};

const formatMeasurement = (quantity: number, unit: string) => {
	return `${quantity} ${unit}`;
};

const isInStock = (ingredient: Ingredient) => {
	return ingredient.inventoryQty > 0;
};

interface RecipeDetailsProps {
	recipe: Recipe | null | undefined;
	isLoading: boolean;
}

const RecipeDetails = ({ recipe, isLoading }: RecipeDetailsProps) => {
	const [selectedIngredient, setSelectedIngredient] =
		useState<Ingredient | null>(null);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!recipe) {
		return <div>Recipe not found</div>;
	}

	console.log('recipe', recipe);

	return (
		<div className="p-6">
			{/* Header Section */}
			<div className="flex justify-between items-start">
				<div className="space-y-1">
					<div className="flex items-center gap-2">
						<Link href="/operational-planning/recipe-management/recipes">
							<Button variant="ghost" size="sm">
								<ArrowLeft className="h-4 w-4 mr-2" />
								Back to Recipes
							</Button>
						</Link>
						<Badge
							variant={recipe?.status === 'published' ? 'default' : 'secondary'}
						>
							{recipe?.status}
						</Badge>
					</div>

					<h1 className="text-3xl font-bold">{recipe?.name}</h1>
					<p className="text-sm text-muted-foreground">
						Recipe Code: {recipe?.id}
					</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline" size="sm">
						<History className="h-4 w-4" />
						History
					</Button>
					<Button variant="outline" size="sm">
						<Share2 className="h-4 w-4" />
						Share
					</Button>
					<Button variant="outline" size="sm">
						<Printer className="h-4 w-4" />
						Print
					</Button>
					<Button variant="outline" size="sm">
						<FileDown className="h-4 w-4" />
						Download
					</Button>
					<Button size="sm" asChild>
						<Link
							href={`/operational-planning/recipe-management/recipes/${recipe?.id}/edit`}
						>
							<Edit className="h-4 w-4" />
							Edit Recipe
						</Link>
					</Button>
				</div>
			</div>
			{/* Main Content */}
			<div className="grid grid-cols-3 gap-6">
				{/* Left Column - Overview and Image */}
				<div className="space-y-6">
					<div className="relative">
						<Image
							src={recipe?.image || '/images/default-recipe.jpg'}
							alt={recipe?.name || 'Recipe Image'}
							width={500}
							height={500}
							priority={true}
						/>
					</div>
					<Card className="p-4">
						<h2 className="text-lg font-semibold mb-2">Basic Information</h2>
						<div className="grid grid-cols-2 gap-4 text-sm">
							<div>
								<p className="text-muted-foreground">Category</p>
								<p className="font-medium">{recipe?.category}</p>
							</div>
							<div>
								<p className="text-muted-foreground">Recipe Unit</p>
								<p className="font-medium">Per Recipe</p>
							</div>
							<div>
								<p className="text-muted-foreground">Unit of Sale</p>
								<p className="font-medium">Per Portion</p>
							</div>
							<div>
								<p className="text-muted-foreground">Number of Portions</p>
								<p className="font-medium">{recipe?.yield}</p>
							</div>
							<div>
								<p className="text-muted-foreground">Preparation Time</p>
								<p className="font-medium flex items-center">
									<Clock className="h-4 w-4 mr-1" />
									{recipe?.prepTime} mins
								</p>
							</div>
							<div>
								<p className="text-muted-foreground">Total Time</p>
								<p className="font-medium flex items-center">
									<Clock className="h-4 w-4 mr-1" />
									{recipe?.totalTime} mins
								</p>
							</div>
							<div>
								<p className="text-muted-foreground">Created</p>
								<p className="font-medium">{recipe?.createdAt}</p>
							</div>
							<div>
								<p className="text-muted-foreground">Last Modified</p>
								<p className="font-medium">{recipe?.updatedAt}</p>
							</div>
							<div className="space-y-1">
								<p className="text-muted-foreground">Stock Management:</p>
								<Badge
									variant={recipe?.deductFromStock ? 'default' : 'secondary'}
								>
									{recipe?.deductFromStock
										? 'Deduct from Stock'
										: 'Manual Stock Management'}
								</Badge>
							</div>
						</div>
					</Card>
					<Card className="p-4">
						<div className="flex items-center justify-between">
							<h2 className="text-lg font-semibold">Carbon Footprint</h2>
							<Leaf className="h-5 w-5 text-green-500" />
						</div>
						<div className="space-y-4">
							<div className="flex justify-between items-center">
								<span className="text-muted-foreground">
									Standard Value (CO₂eq):
								</span>
								<span className="font-medium">
									{recipe?.carbonFootprint} kg
								</span>
							</div>
							{recipe?.carbonFootprintSource && (
								<div className="text-sm text-muted-foreground">
									<span className="block font-medium mb-1">Source:</span>
									<span>{recipe?.carbonFootprintSource}</span>
								</div>
							)}
						</div>
					</Card>
				</div>
				{/* Right Column - Details Tabs */}
				<div className="col-span-2">
					<Tabs defaultValue="ingredients" className="w-full">
						<TabsList>
							<TabsTrigger value="ingredients">Ingredients</TabsTrigger>
							<TabsTrigger value="preparation">Preparation</TabsTrigger>
							<TabsTrigger value="cost">Cost Summary</TabsTrigger>
							<TabsTrigger value="details">Details</TabsTrigger>
							<TabsTrigger value="notes">Notes</TabsTrigger>
						</TabsList>

						<TabsContent value="ingredients" className="space-y-4">
							<div className="grid grid-cols-[2fr,1fr] gap-4">
								{/* Left Panel - Ingredients List */}
								<div className="space-y-4">
									<Card className="px-3 py-6">
										<div className="flex justify-between items-center mb-6">
											<div>
												<h3 className="font-semibold">Recipe Components</h3>
												<p className="text-sm text-muted-foreground">
													All measurements are in recipe units
												</p>
											</div>
											<Badge variant="outline">
												{recipe?.yield} {recipe?.yieldUnit}
											</Badge>
										</div>
										<div className="space-y-8">
											{/* Group ingredients by component */}
											{Object.entries(
												groupIngredientsByComponent(recipe?.ingredients || [])
											).map(([component, ingredients]) => (
												<div key={component} className="space-y-4">
													<div className="flex items-center justify-between">
														<h3
															className={cn(
																'text-lg font-semibold text-muted-foreground',
																component === 'Main Ingredients' && 'italic'
															)}
														>
															{component}
														</h3>
														<Badge variant="secondary">
															{ingredients.length}{' '}
															{ingredients.length === 1 ? 'item' : 'items'}
														</Badge>
													</div>
													<div className="space-y-4">
														{ingredients.map((ingredient, index) => (
															<div
																key={index}
																className={cn(
																	'bg-muted/50 rounded-lg p-4 cursor-pointer hover:bg-muted/70 transition-colors',
																	selectedIngredient?.id === ingredient.id &&
																		'ring-2 ring-primary'
																)}
																onClick={() =>
																	setSelectedIngredient(ingredient)
																}
															>
																<div className="flex justify-between items-start">
																	<div>
																		<h4 className="font-medium">
																			{ingredient.name}
																		</h4>
																	</div>
																	<Badge
																		variant="secondary"
																		className="w-24 justify-center"
																	>
																		{formatMeasurement(
																			ingredient.quantity,
																			ingredient.unit
																		)}
																	</Badge>
																</div>
															</div>
														))}
													</div>
												</div>
											))}
										</div>
									</Card>
								</div>

								{/* Right Panel - Inventory Details */}
								<div className="space-y-4">
									{/* Ingredient Details */}
									<Card className="px-3 py-6">
										<h3 className="font-semibold mb-4">Ingredient Details</h3>
										{selectedIngredient ? (
											<div className="space-y-4">
												<div className="flex justify-between items-center">
													<span className="text-sm text-muted-foreground">
														Status
													</span>
													<Badge
														variant={
															isInStock(selectedIngredient)
																? 'secondary'
																: 'destructive'
														}
													>
														{isInStock(selectedIngredient)
															? 'In Stock'
															: 'Out of Stock'}
													</Badge>
												</div>
												<div className="space-y-2">
													<div className="flex justify-between text-sm">
														<span className="text-muted-foreground">
															Inventory Qty
														</span>
														<span>
															{formatMeasurement(
																selectedIngredient.inventoryQty,
																selectedIngredient.inventoryUnit ||
																	selectedIngredient.unit
															)}
														</span>
													</div>
													<div className="flex justify-between text-sm">
														<span className="text-muted-foreground">
															Wastage
														</span>
														<span>{selectedIngredient.wastage}%</span>
													</div>
													<div className="flex justify-between text-sm">
														<span className="text-muted-foreground">
															Cost/Unit
														</span>
														<span>
															${selectedIngredient.costPerUnit}/
															{selectedIngredient.unit}
														</span>
													</div>
													<div className="flex justify-between text-sm">
														<span className="text-muted-foreground">
															Net Cost
														</span>
														<span>
															$
															{(
																selectedIngredient.quantity *
																selectedIngredient.costPerUnit
															).toFixed(2)}
														</span>
													</div>
													<div className="flex justify-between text-sm">
														<span className="text-muted-foreground">
															Wastage Cost
														</span>
														<span>
															$
															{(
																(selectedIngredient.quantity *
																	selectedIngredient.costPerUnit *
																	selectedIngredient.wastage) /
																100
															).toFixed(2)}
														</span>
													</div>
													<div className="flex justify-between text-sm font-medium">
														<span>Total Cost</span>
														<span>
															${selectedIngredient.totalCost.toFixed(2)}
														</span>
													</div>
												</div>
											</div>
										) : (
											<div className="text-sm text-muted-foreground text-center py-4">
												Select an ingredient to view details
											</div>
										)}
									</Card>

									{/* Inventory Status */}
									<Card className="px-3 py-6">
										<h3 className="font-semibold mb-4">Inventory Status</h3>
										<div className="space-y-4">
											<div className="flex items-center justify-between">
												<span className="text-sm">Missing Items</span>
												<Badge variant="destructive">
													{
														recipe?.ingredients.filter((i) => !isInStock(i))
															.length
													}{' '}
													Items
												</Badge>
											</div>
											<div className="space-y-2">
												{recipe?.ingredients
													.filter((i) => !isInStock(i))
													.slice(0, 3)
													.map((ingredient, index) => (
														<div
															key={index}
															className="flex items-center justify-between text-sm p-2 bg-muted rounded-lg"
														>
															<div>
																<span>{ingredient.name}</span>
																<div className="text-xs text-muted-foreground">
																	{formatMeasurement(
																		ingredient.quantity,
																		ingredient.unit
																	)}{' '}
																	needed
																</div>
															</div>
															<Badge
																variant="outline"
																className="text-destructive border-destructive"
															>
																Out of Stock
															</Badge>
														</div>
													))}
											</div>
											<Button variant="outline" size="sm" className="w-full">
												View All Missing Items
											</Button>
										</div>
									</Card>

									{/* Recipe Summary */}
									<Card className="px-3 py-6">
										<h3 className="font-semibold mb-4">Recipe Summary</h3>
										<div className="space-y-4">
											<div className="space-y-2">
												<div className="flex justify-between text-sm">
													<span className="text-muted-foreground">
														Total Ingredients
													</span>
													<span>{recipe?.ingredients.length}</span>
												</div>
												<div className="flex justify-between text-sm">
													<span className="text-muted-foreground">
														Components
													</span>
													<span>
														{
															Object.keys(
																groupIngredientsByComponent(
																	recipe?.ingredients || []
																)
															).length
														}
													</span>
												</div>
												<div className="flex justify-between text-sm">
													<span className="text-muted-foreground">
														In Stock
													</span>
													<Badge variant="secondary">
														{
															recipe?.ingredients.filter((i) => isInStock(i))
																.length
														}{' '}
														of {recipe?.ingredients.length}
													</Badge>
												</div>
												<div className="flex justify-between text-sm">
													<span className="text-muted-foreground">
														Allergens
													</span>
													<Badge variant="secondary">2</Badge>
												</div>
											</div>
											<div className="pt-2 border-t">
												<h4 className="text-sm font-medium mb-2">
													Allergen Information
												</h4>
												<div className="flex flex-wrap gap-2">
													<Badge variant="outline">Dairy</Badge>
													<Badge variant="outline">Nuts</Badge>
												</div>
											</div>
										</div>
									</Card>

									{/* Ordering Information */}
									<Card className="px-3 py-6">
										<h3 className="font-semibold mb-4">Ordering Information</h3>
										<div className="space-y-4">
											<div className="flex justify-between items-center text-sm">
												<span className="text-muted-foreground">
													Last Order
												</span>
												<span>2024-02-15</span>
											</div>
											<div className="flex justify-between items-center text-sm">
												<span className="text-muted-foreground">
													Next Order Due
												</span>
												<Badge variant="secondary">2024-02-28</Badge>
											</div>
											<div className="flex justify-between items-center text-sm">
												<span className="text-muted-foreground">
													Preferred Supplier
												</span>
												<span>Metro Foods</span>
											</div>
											<Button variant="outline" size="sm" className="w-full">
												Create Purchase Order
											</Button>
										</div>
									</Card>
								</div>
							</div>
						</TabsContent>

						<TabsContent value="preparation" className="space-y-6">
							{recipe?.steps.map((step) => (
								<Card key={step.id} className="px-3 py-6">
									<div className="grid grid-cols-[auto,300px,1fr] gap-6">
										<div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
											{step.order}
										</div>

										{/* Step Image */}
										{step.image && (
											<div className="relative">
												<Image
													src={step.image}
													alt={`Step ${step.order}`}
													priority={false}
													width={300}
													height={300}
												/>
											</div>
										)}

										<div className="space-y-4">
											<div>
												<h3 className="font-medium mb-2">Instructions</h3>
												<p className="text-sm">{step.description}</p>
											</div>
											<div className="grid grid-cols-3 gap-4">
												{step.duration && (
													<div>
														<p className="text-sm text-muted-foreground">
															Duration
														</p>
														<p className="font-medium flex items-center">
															<Clock className="h-4 w-4 mr-1" />
															{step.duration} mins
														</p>
													</div>
												)}
												{step.temperature && (
													<div>
														<p className="text-sm text-muted-foreground">
															Temperature
														</p>
														<p className="font-medium flex items-center">
															<Thermometer className="h-4 w-4 mr-1" />
															{step.temperature}°C
														</p>
													</div>
												)}
												{step.equipments && step.equipments.length > 0 && (
													<div>
														<p className="text-sm text-muted-foreground">
															Equipment
														</p>
														<p className="font-medium">
															{step.equipments.join(', ')}
														</p>
													</div>
												)}
											</div>
										</div>
									</div>
								</Card>
							))}
						</TabsContent>

						<TabsContent value="cost" className="space-y-4">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-lg font-semibold">Cost Analysis</h2>
								<Button variant="outline" size="sm">
									<Clock className="h-4 w-4 mr-2" />
									Recalculate
								</Button>
							</div>

							<div className="grid grid-cols-2 gap-6">
								{/* Ingredient Costs */}
								<Card className="px-3 py-6">
									<h3 className="font-medium mb-4">Ingredient Costs</h3>
									<div className="space-y-4">
										<div className="border rounded-lg">
											<table className="w-full">
												<thead className="border-b">
													<tr>
														<th className="text-left p-3 text-sm font-medium">
															Item
														</th>
														<th className="text-right p-3 text-sm font-medium">
															Cost
														</th>
														<th className="text-right p-3 text-sm font-medium">
															%
														</th>
													</tr>
												</thead>
												<tbody>
													{recipe.ingredients.length > 0 ? (
														recipe?.ingredients.map((ingredient, index) => (
															<tr key={index} className="border-b">
																<td className="p-3 text-sm">
																	{ingredient.name}
																</td>
																<td className="p-3 text-sm text-right">
																	${ingredient.totalCost.toFixed(2)}
																</td>
																<td className="p-3 text-sm text-right">
																	{(
																		(ingredient.totalCost / recipe.totalCost) *
																		100
																	).toFixed(1)}
																	%
																</td>
															</tr>
														))
													) : (
														<tr>
															<td
																colSpan={3}
																className="p-3 text-sm text-center text-muted-foreground"
															>
																No ingredients added
															</td>
														</tr>
													)}
												</tbody>
												<tfoot className="border-t bg-muted/50">
													<tr>
														<td className="p-3 text-sm font-medium">
															Total Ingredient Cost
														</td>
														<td
															colSpan={2}
															className="p-3 text-sm text-right font-medium"
														>
															${recipe?.totalCost.toFixed(2)}
														</td>
													</tr>
												</tfoot>
											</table>
										</div>
									</div>
								</Card>

								{/* Cost Summary */}
								<Card className="px-3 py-6">
									<h3 className="font-medium mb-4">Cost Summary</h3>
									<div className="space-y-6">
										<div className="grid grid-cols-2 gap-4">
											<div>
												<label className="text-sm text-muted-foreground">
													Labor Cost %
												</label>
												<div className="flex items-center gap-2 mt-1">
													<input
														type="number"
														className="w-full rounded-md border px-3 py-2"
														defaultValue="30"
														disabled
													/>
													<span className="text-muted-foreground">%</span>
												</div>
											</div>
											<div>
												<label className="text-sm text-muted-foreground">
													Overhead %
												</label>
												<div className="flex items-center gap-2 mt-1">
													<input
														type="number"
														className="w-full rounded-md border px-3 py-2"
														defaultValue="20"
														disabled
													/>
													<span className="text-muted-foreground">%</span>
												</div>
											</div>
										</div>

										<div className="space-y-3">
											<div className="flex justify-between py-2">
												<span className="text-sm">Ingredient Cost:</span>
												<span className="font-medium">
													${recipe?.totalCost.toFixed(2)}
												</span>
											</div>
											<div className="flex justify-between py-2">
												<span className="text-sm">Labor Cost (30%):</span>
												<span className="font-medium">
													${(recipe?.totalCost * 0.3).toFixed(2)}
												</span>
											</div>
											<div className="flex justify-between py-2">
												<span className="text-sm">Overhead (20%):</span>
												<span className="font-medium">
													${(recipe?.totalCost * 0.2).toFixed(2)}
												</span>
											</div>
											<div className="flex justify-between py-2 border-t">
												<span className="font-medium">
													Total Cost Per Portion:
												</span>
												<span className="font-medium">
													${recipe?.costPerPortion.toFixed(2)}
												</span>
											</div>
										</div>
									</div>
								</Card>
							</div>

							{/* Pricing Analysis */}
							<Card className="px-3 py-6">
								<h3 className="font-medium mb-4">Pricing Analysis</h3>
								<div className="grid grid-cols-2 gap-6">
									<div className="space-y-6">
										<div>
											<label className="text-sm text-muted-foreground block mb-1">
												Target Food Cost %
											</label>
											<div className="flex items-center gap-2">
												<input
													type="number"
													className="w-full rounded-md border px-3 py-2"
													defaultValue="33"
													disabled
												/>
												<span className="text-muted-foreground">%</span>
											</div>
										</div>

										<div>
											<label className="text-sm text-muted-foreground block mb-1">
												Selling Price
											</label>
											<div className="flex items-center gap-2">
												<span className="text-muted-foreground">$</span>
												<input
													type="number"
													className="w-full rounded-md border px-3 py-2"
													defaultValue={recipe?.sellingPrice}
													disabled
												/>
											</div>
										</div>

										<div className="space-y-3 text-sm">
											<div className="flex justify-between">
												<span className="text-muted-foreground">
													Recommended Price:
												</span>
												<span>${(recipe?.costPerPortion * 3).toFixed(2)}</span>
											</div>
											<div className="flex justify-between">
												<span className="text-muted-foreground">
													Current Price:
												</span>
												<span>${recipe?.sellingPrice.toFixed(2)}</span>
											</div>
											<div className="flex justify-between">
												<span className="text-muted-foreground">
													Food Cost %:
												</span>
												<span
													className={cn(
														(recipe?.costPerPortion / recipe?.sellingPrice) *
															100 >
															33
															? 'text-destructive'
															: 'text-green-600'
													)}
												>
													{(
														(recipe?.costPerPortion / recipe?.sellingPrice) *
														100
													).toFixed(1)}
													%
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-muted-foreground">
													Gross Profit:
												</span>
												<span>
													$
													{(
														recipe?.sellingPrice - recipe?.costPerPortion
													).toFixed(2)}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-muted-foreground">
													Gross Margin:
												</span>
												<span
													className={cn(
														recipe?.grossMargin < 60
															? 'text-destructive'
															: 'text-green-600'
													)}
												>
													{recipe?.grossMargin.toFixed(1)}%
												</span>
											</div>
										</div>
									</div>

									<div className="border rounded-lg p-4 flex items-center justify-center text-muted-foreground">
										Profitability Chart Coming Soon
									</div>
								</div>
							</Card>

							{/* Competitor Analysis */}
							<Card className="px-3 py-6">
								<div className="flex items-center justify-between mb-4">
									<h3 className="font-medium">Competitor Analysis</h3>
									<Button variant="outline" size="sm">
										<Plus className="h-4 w-4 mr-2" />
										Add Competitor
									</Button>
								</div>
								<div className="border rounded-lg">
									<table className="w-full">
										<thead className="border-b">
											<tr>
												<th className="text-left p-3 text-sm font-medium">
													Competitor
												</th>
												<th className="text-right p-3 text-sm font-medium">
													Price
												</th>
												<th className="text-right p-3 text-sm font-medium">
													Portion
												</th>
												<th className="text-right p-3 text-sm font-medium">
													Price/100g
												</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td
													colSpan={4}
													className="p-3 text-sm text-center text-muted-foreground"
												>
													No competitor data available
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</Card>
						</TabsContent>

						<TabsContent value="notes" className="space-y-4">
							<Card className="px-3 py-6">
								<div className="space-y-6">
									<div>
										<h3 className="font-semibold mb-2">Preparation Notes</h3>
										<p className="text-muted-foreground">
											{recipe?.prepNotes || 'No preparation notes available.'}
										</p>
									</div>
									<div>
										<h3 className="font-semibold mb-2">Special Instructions</h3>
										<p className="text-muted-foreground">
											{recipe?.specialInstructions ||
												'No special instructions available.'}
										</p>
									</div>
									<div>
										<h3 className="font-semibold mb-2">
											Additional Information
										</h3>
										<p className="text-muted-foreground">
											{recipe?.additionalInfo ||
												'No additional information available.'}
										</p>
									</div>
								</div>
							</Card>
						</TabsContent>

						<TabsContent value="details" className="space-y-6">
							{/* Recipe Description */}
							<Card className="px-3 py-6">
								<div className="space-y-4">
									<div className="flex items-center gap-2">
										<h3 className="font-medium">Recipe Description</h3>
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger>
													<Info className="h-4 w-4 text-muted-foreground" />
												</TooltipTrigger>
												<TooltipContent>
													<p>A brief description of your recipe</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
									<p className="text-muted-foreground">
										{recipe?.description || 'No description available.'}
									</p>
								</div>
							</Card>

							{/* Ingredient Details */}
							<Card className="px-3 py-6">
								<div className="space-y-4">
									<div className="flex items-center gap-2">
										<h3 className="font-medium">Ingredient Details</h3>
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger>
													<Info className="h-4 w-4 text-muted-foreground" />
												</TooltipTrigger>
												<TooltipContent>
													<p>Additional details about the ingredients</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div>
											<Label>Allergens</Label>
											<div className="flex flex-wrap gap-2 mt-2">
												{recipe?.allergens.length > 0 ? (
													recipe?.allergens.map((allergen, index) => (
														<Badge key={index} variant="outline">
															{allergen}
														</Badge>
													))
												) : (
													<p className="text-sm text-muted-foreground">
														No allergens listed
													</p>
												)}
											</div>
										</div>
										<div>
											<Label>Tags</Label>
											<div className="flex flex-wrap gap-2 mt-2">
												{recipe?.tags.length > 0 ? (
													recipe?.tags.map((tag, index) => (
														<Badge key={index} variant="outline">
															{tag}
														</Badge>
													))
												) : (
													<p className="text-sm text-muted-foreground">
														No tags added
													</p>
												)}
											</div>
										</div>
									</div>
								</div>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default RecipeDetails;
