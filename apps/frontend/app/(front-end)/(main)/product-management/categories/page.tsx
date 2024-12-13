import React from 'react'
import CategorieList from './components/CategorieList'

const CategoriePage = () => {
	return (
		<div className="space-y-6 p-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-semibold text-gray-900">
					Category Management
				</h1>
			</div>
			<CategorieList />
		</div>
	);
};

export default CategoriePage