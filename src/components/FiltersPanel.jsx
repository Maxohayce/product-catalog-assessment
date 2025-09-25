import React from 'react';

export default function FiltersPanel({
    categories,
    selectedCategory,
    onCategoryChange,
    priceBounds,
    priceRange,
    onPriceChange,
    activeFilters,
    onClear
}) {
    return (
        <aside className="space-y-4 w-full md:w-64">
            <div>
                <h3 className="text-sm font-semibold mb-2">Category</h3>
                <select
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="w-full rounded-md p-2 border dark:bg-gray-800 dark:border-gray-700"
                >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>

            <div>
                <h3 className="text-sm font-semibold mb-2">Price</h3>
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        value={priceRange[0]}
                        min={priceBounds[0]}
                        max={priceRange[1]}
                        onChange={e => onPriceChange([Number(e.target.value), priceRange[1]])}
                        className="w-1/2 rounded-md p-2 border dark:bg-gray-800 dark:border-gray-700"
                        aria-label="Minimum price"
                    />
                    <input
                        type="number"
                        value={priceRange[1]}
                        min={priceRange[0]}
                        max={priceBounds[1]}
                        onChange={e => onPriceChange([priceRange[0], Number(e.target.value)])}
                        className="w-1/2 rounded-md p-2 border dark:bg-gray-800 dark:border-gray-700"
                        aria-label="Maximum price"
                    />
                </div>
                <p className="text-xs text-gray-500 mt-1">Range: ${priceBounds[0]} — ${priceBounds[1]}</p>
            </div>

            <div>
                <h3 className="text-sm font-semibold mb-2">Active filters</h3>
                <div className="flex flex-wrap gap-2">
                    {activeFilters.length === 0 && <span className="text-sm text-gray-500">None</span>}
                    {activeFilters.map(f => (
                        <span key={f.key} className="text-sm bg-indigo-100 dark:bg-indigo-900 px-2 py-1 rounded-full">
                            {f.label}
                        </span>
                    ))}
                </div>
                {activeFilters.length > 0 && (
                    <button className="mt-2 text-sm underline" onClick={onClear}>Clear filters</button>
                )}
            </div>
        </aside>
    );
}
